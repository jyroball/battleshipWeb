<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
require_once("../../SimpleRemoteFunctions.php");

class BSDatabase
{

    //BASIC DATABASE FUNCTIONS
    public static function StartConnection()
    {
        database_connect();
    }

    public static function StopConnection()
    {
        database_close();
    }

    //USER DATABASE FUNCTIONS
    public static function Loggedin()
    {
        $result = false;
        $username = BSDatabase::GetCookie("username");
        $session = BSDatabase::GetCookie("session");
        if (isset($username) && isset($session)) {
            $sessioninfo = database_query(BSQueries::ValidateUserSession($username, $session));
            if ($sessioninfo->field_count > 0||$sessioninfo->num_rows > 0) {
                $result = true;
            }
        }
        if (!$result) {
            BSDatabase::Logout();
        }
        return $result;
    }

    // Attempt login to username
    public static function Login($username, $password)
    {
        $result = '';
        //$tmp_query = "SELECT id,username,password,firstname,lastname FROM battleship1_users WHERE username = '" . $username . "' LIMIT 1 ;"
        $data = database_query(BSQueries::GrabUserInfo($username));
        if ($data && $data->num_rows > 0) {
            $user_data = $data->fetch_assoc();
            if ($user_data["password"] == $password) {
                $newsession = BSDatabase::GenerateToken($user_data["username"]);
                database_query(BSQueries::UpdateUserSession($user_data["username"], $newsession));
                BSDatabase::SetCookie("userid", $user_data["id"]);
                BSDatabase::SetCookie("username", $user_data["username"]);
                BSDatabase::SetCookie("firstname", $user_data["firstname"]);
                BSDatabase::SetCookie("lastname", $user_data["lastname"]);
                BSDatabase::SetCookie("session", $newsession);
                BSDatabase::SetCookie("gamesession", $user_data["gamesession"]);
                $result = "loggedin";
            } else {
                $result = "wrongpassword";
            }
        } else {
            $result = "unknownuser";
        }
        return $result;
    }

    public static function Logout()
    {
        
        $session = BSDatabase::GetCookie("session");
        if (isset($session)) {
        @database_query(BSQueries::ClearSession($session));
        }
        BSDatabase::UnSetCookie("userid");
        BSDatabase::UnSetCookie("username");
        BSDatabase::UnSetCookie("firstname");
        BSDatabase::UnSetCookie("lastname");
        BSDatabase::UnSetCookie("session");
        BSDatabase::UnSetCookie("gamesession");
        BSDatabase::EndSession();
    }

    // Registers a username
    public static function Register($username, $firstname, $lastname, $password)
    {
        $result = '';

        //$tmp_query = "SELECT id,username FROM battleship1_users WHERE username = '" .  . "' LIMIT 1;";

        $data = database_query(BSQueries::GrabUserID($username));

        if ($data) {
            if ($data->num_rows > 0) {
                $result = "usertaken";
            } else {
                //$tmp_query = 'INSERT INTO battleship1_users(username,firstname,lastname,password)
                //VALUES("' . $username . '", "' . $firstname . '", "' . $lastname . '", "' . $password . '");';
                if (database_query(BSQueries::InsertNewUser($username, $firstname, $lastname, $password)))
                    $result = "signedup";
                else
                    $result = "failed";
            }
        } else {
            $result = "failed";
        }
        return $result;
    }

    //GAME FUNCTIONS

    public static function RequestGameSession()
    {
        $result = '';
        $userdata = BSDatabase::Loggedin();
        if (isset($userdata)) {
            $result = BSDatabase::UserInGameSession($userdata["username"]);
        }
        return $result;
    }

    public static function UserInGameSession($username)
    {
        $result = array("result" => '');
        //$tmp_query = "SELECT id,username,gameid FROM battleship1_users WHERE username = '" . $username . "' LIMIT 1 ;";
        $data = database_query(BSQueries::GetUserGameInfo($username));
        if ($data && $data->num_rows > 0) {
            $user_data = $data->fetch_assoc();
            if (isset($user_data["gameid"])) {
                $result["result"] = "useringame";
                $result["gameid"] = $user_data["gameid"];
            } else {
                $result["result"] = "usernotingame";
            }
        } else {
            $result["result"] = "unknownuser";
        }
        return $result;
    }

    //SESSION FUNCTIONS

    // Gets a variable from session/cookie, prioritizes php sessions.
    public static function GetVariable($name)
    {
        $result = NULL;
        BSDatabase::StartSession();
        if (isset($_SESSION[$name])) {
            $result = $_SESSION[$name];
        } else if (isset($_COOKIE[$name])) {
            $result = $_COOKIE[$name];
        }
        return $result;
    }

    // Sets a variable to session/cookie, prioritizes php sessions.
    public static function SetVariable($name, $data)
    {
        if (BSDatabase::StartSession() == PHP_SESSION_ACTIVE) {
            $_SESSION[$name] = $data;
            if (isset($_COOKIE[$name])) {
                unset($_COOKIE[$name]);
            }
        } else {
            setcookie($name, $data);
            if (isset($_SESSION[$name]))
                unset($_SESSION[$name]);
        }
    }

    public static function UnSetVariable($name)
    {
        if (BSDatabase::StartSession() == PHP_SESSION_ACTIVE) {
            unset($_SESSION[$name]);
            unset($_COOKIE[$name]);
        } else {
            unset($_COOKIE[$name]);
        }
    }

    // Gets a variable from cookie.
    public static function GetCookie($name)
    {
        $result = NULL;
        if (isset($_COOKIE[$name])) {
            $result = $_COOKIE[$name];
        }
        return $result;
    }


    // Sets a variable to cookie.
    public static function SetCookie($name, $data)
    {
        setcookie($name, $data);
    }

    // UnSets a variable to cookie.
    public static function UnSetCookie($name)
    {
        setcookie($name);
        unset($_COOKIE[$name]);
    }

    // Starts PHP Session
    public static function StartSession()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        return session_status();
    }

    // Ends PHP Session
    public static function EndSession()
    {
        if (BSDatabase::StartSession() == PHP_SESSION_ACTIVE) {
            session_unset();
            session_destroy();
        }
        return session_status();
    }

    //TOOL FUNCTIONS

    //Generates Random SHA1 Token
    public static function GenerateToken($salt)
    {
        return sha1(rand(0, time()) . $salt);
    }
}

class BSQueries
{
    //Used for Validation, User Exists.
    public static function GrabUserID($username)
    {
        $cusername = strtolower($username);
        return "SELECT id,username
                FROM battleship1_2021_users
                WHERE username = '{$cusername}'
                LIMIT 1;";
    }

    //Grab User Info.
    public static function GrabUserInfo($username)
    {
        $cusername = strtolower($username);
        return "SELECT id , username , password , firstname , lastname, session, gamesession
                FROM battleship1_2021_users
                WHERE username = '{$cusername}'
                LIMIT 1;";
    }

    public static function InsertNewUser($username, $firstname, $lastname, $password)
    {
        $cusername = strtolower($username);
        $cfirstname = ucfirst(strtolower($firstname));
        $clastname = ucfirst(strtolower($lastname));
        return "INSERT INTO battleship1_2021_users (username , firstname , lastname , password)
                VALUES('{$cusername}', '{$cfirstname}', '{$clastname}', '{$password}');";
    }

    public static function InsertNewUserNotExists($username, $firstname, $lastname, $password)
    {
        $cusername = strtolower($username);
        $cfirstname = ucfirst(strtolower($firstname));
        $clastname = ucfirst(strtolower($lastname));
        return "INSERT INTO battleship1_2021_users (username , firstname , lastname , password)
                SELECT '{$cusername}', '{$cfirstname}', '{$clastname}', '{$password}'
                WHERE NOT EXISTS (SELECT username FROM battleship1_2021_users WHERE username = '{$cusername}');";
    }

    public static function ValidateUserSession($username, $session)
    {
        $cusername = strtolower($username);
        return "SELECT id,username,session
                FROM battleship1_2021_users
                WHERE username = '{$cusername}' AND session = '{$session}'
                LIMIT 1;";
    }

    public static function UpdateUserSession($username, $session)
    {
        $cusername = strtolower($username);
        return "UPDATE battleship1_2021_users
                SET 
                session = '{$session}'
                WHERE username = '{$cusername}';";
    }

    public static function ClearUserSession($username)
    {
        $cusername = strtolower($username);
        return "UPDATE battleship1_2021_users
                SET 
                session = NULL
                WHERE username = '{$cusername}';";
    }

    public static function ClearSession($session)
    {
        return "UPDATE battleship1_2021_users
                SET 
                session = NULL
                WHERE session = '{$session}';";
    }

    public static function GetUserGameInfo($username)
    {
        $cusername = strtolower($username);
        return "SELECT id , username , gamesession
                FROM battleship1_2021_users
                WHERE username = '{$cusername}'
                LIMIT 1;";
    }

    public static function GetAvailableGame()
    {
        return "SELECT session
                FROM battleship1_2021_games 
                WHERE playertwo IS NULL
                FOR UPDATE
                LIMIT 1;";
    }

    public static function JoinAvailableGame($userid, $gamesession)
    {
        return "INSERT INTO battleship1_2021_games (gamestate, playerone, playerone_status , session)
                SELECT 'Queue', '{$userid}' , 'Queue' , '{$gamesession}'
                WHERE NOT EXISTS (SELECT session FROM battleship1_2021_games WHERE session = '{$gamesession}');";
    }

    public static function InsertNewGame($userid, $gamesession)
    {
        return "INSERT INTO battleship1_2021_games (gamestate, playerone, playerone_status , session)
                SELECT 'Queue', '{$userid}' , 'Queue' , '{$gamesession}'
                WHERE NOT EXISTS (SELECT session FROM battleship1_2021_games WHERE session = '{$gamesession}');";
    }

    public static function UpdateUserGameInfo($userid, $gamesession)
    {
        return "UPDATE battleship1_2021_users 
                SET 
                session='{$gamesession}'
                WHERE id = '{$userid}';";
    }

    public static function GetGameInfoLock($gamesession)
    {
        return "SELECT * FROM battleship1_2021_games 
                WHERE session = '{$gamesession}' 
                FOR UPDATE
                LIMIT 1;";
    }

    public static function UpdateGameInfo($gamesession, $gamestate, $gridonejson, $gridtwojson, $shipsonejson, $shipstwojson, $useronestatus, $usertwostatus, $turn, $totalturns)
    {
        return "UPDATE battleship1_2021_games 
                SET 
                gamestate='{$gamestate}'
                playerone_grid='{$gridonejson}'
                playertwo_grid='{$gridtwojson}'
                playerone_ships='{$shipsonejson}'
                playertwo_ships='{$shipstwojson}'
                playerone_status='{$useronestatus}'
                playertwo_status='{$usertwostatus}'
                turn='{$turn}',
                totalturns='{$totalturns}'
                WHERE session = '{$gamesession}';";
    }

    public static function FinalizeGame($gamesession)
    {
        return "UPDATE battleship1_2021_games 
                SET 
                gamestate='Post'
                playerone_status='Post'
                playertwo_status='Post'
                WHERE session = '{$gamesession}';";
    }

    public static function ClearGameUsers($gamesession)
    {
        return "UPDATE battleship1_2021_users
                SET 
                gamesession = NULL
                WHERE gamesession = '{$gamesession}';";
    }

    public static function PostLeaderboard($gamesession, $gamestate, $playerone, $playertwo, $winner, $playerone_misses, $playertwo_misses, $totalturns)
    {
        return "INSERT INTO battleship1_2021_leaderboard (playerone, playertwo , winner, playerone_misses, playertwo_misses,totalturns,gamesession)
                SELECT '{$gamestate}', '{$playerone}' , '{$playertwo}' , '{$winner}','{$playerone_misses}','$playertwo_misses','{$totalturns}','{$gamesession}'
                WHERE NOT EXISTS (SELECT gamesession FROM battleship1_2021_leaderboard WHERE gamesession = '{$gamesession}');";
    }

    public static function GetLeaderboard()
    {
        return "SELECT playerone, playertwo , winner, playerone_misses , playertwo_misses , totalturns
                FROM battleship1_2021_leaderboard";
    }
}
