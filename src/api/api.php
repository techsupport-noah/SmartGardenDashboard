<?php
$servername = "10.35.47.31:3306";
$username = "k126970_se";
$password = "Slor87@26";
$dbname = "k126970_se";

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    header("Pragma: undefined");
    header('Content-Type: application/json');
    



    //check if createPlant isset
    if (isset($_GET["createPlant"])) {
        $plantname = checkParameter(file_get_contents('php://input'));
    
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "INSERT IGNORE INTO pflanzen (
            ID, Name
            ) VALUES (
            NULL, '$plantname'
        )";

        $sql_1 = "CREATE TABLE IF NOT EXISTS " . $plantname . "_feuchtigkeitswerte (
            ID INT NOT NULL AUTO_INCREMENT,
            Value INT NOT NULL,
            Timepoint DATE NOT NULL,
            PRIMARY KEY(ID) 
        )";
        $sql_2 = "CREATE TABLE IF NOT EXISTS " . $plantname . "_lichtwerte (
            ID INT NOT NULL AUTO_INCREMENT,
            Value INT NOT NULL,
            Timepoint DATE NOT NULL,
            PRIMARY KEY(ID) 
        )";
        $sql_3 = "CREATE TABLE IF NOT EXISTS " . $plantname . "_temperaturwerte (
            ID INT NOT NULL AUTO_INCREMENT,
            Value INT NOT NULL,
            Timepoint DATE NOT NULL,
            PRIMARY KEY(ID) 
        )";

        //execute all querys
        $result = $conn->query($sql);
        $result_1 = $conn->query($sql_1);
        $result_2 = $conn->query($sql_2);
        $result_3 = $conn->query($sql_3);

        //return success to post request
        echo json_encode(array(
            "success" => true
        ));
    } 
    
    if(isset($_GET['deletePlant'])){

        $plantname = checkParameter(file_get_contents('php://input'));
    
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql = "DELETE FROM pflanzen WHERE Name='$plantname'";

        $sql_1 = "DROP TABLE IF EXISTS " . $plantname . "_feuchtigkeitswerte";
        $sql_2 = "DROP TABLE IF EXISTS " . $plantname . "_lichtwerte";
        $sql_3 = "DROP TABLE IF EXISTS " . $plantname . "_temperaturwerte";

        //execute all querys
        $result = $conn->query($sql);
        $result_1 = $conn->query($sql_1);
        $result_2 = $conn->query($sql_2);
        $result_3 = $conn->query($sql_3);

        //return success to post request
        echo json_encode(array(
            "success" => true
        ));

    }
        
    if(isset($_GET["query"])){

        $QUERY_PARAM = checkParameter($_GET["query"]);

        //check if query is valid
            $allowed = ['/pflanzen/','/([a-z0-9]*)feuchtigkeitswerte/','/([a-z0-9]*)temperaturwerte/','/([a-z0-9]*)lichtwerte/'];
            $flag = 0; 
            foreach($allowed as &$element){
                if(preg_match($element, $QUERY_PARAM) === 1){
                    $flag = 1;
                    break;
                }
            }
            if($flag===0){
                //didn't match any expressions
                exit("Can't query this.");
            }
            
        //define data type

        class Datapoint {
            private $id;
            private $timepoint;
            private $value;
            public function __construct($id, $timepoint, $value){
                $this->id = $id;
                $this->timepoint = $timepoint;
                $this->value = $value;
            }
            public function expose() {
                return get_object_vars($this);
            }
        }
        class Plant {
            private $id;
            private $name;
            public function __construct($id, $name){
                $this->id = $id;
                $this->name = $name;
            }
            public function expose() {
                return get_object_vars($this);
            }
        }

        //make db connection

            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
        //create query
        $query = "SELECT * FROM  ". $QUERY_PARAM;
           //echo $query;
            
        $data = array();

        if($result = $conn->query($query)){
             //create data 
            if($_GET["query"]=="pflanzen"){
                while ($obj = $result->fetch_object()) {
                    array_push($data, (new Plant($obj->ID, $obj->Name))->expose());
                } 
            }else{
                while ($obj = $result->fetch_object()) {
                    array_push($data, (new Datapoint($obj->ID, $obj->Timepoint, $obj->Value))->expose());
                }
            }
            $result->free_result();
        }

        $conn->close(); 
        
        echo json_encode($data);
    }

    if(isset($_GET['upload'])){

        $plantname = checkParameter($_GET['plantname']);

        $value_temp = checkParameter($_GET['value_temp']);
        $value_humid = checkParameter($_GET['value_humid']);
        $value_light = checkParameter($_GET['value_light']);

        

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $sql_1 = "INSERT INTO " . $plantname . "_feuchtigkeitswerte (
            ID, Value, Timepoint
            ) VALUES (
            NULL, '$value_humid', NOW()
        )";
        $sql_2 = "INSERT INTO " . $plantname . "_temperaturwerte (
            ID, Value, Timepoint
            ) VALUES (
            NULL, '$value_temp', NOW()
        )";
        $sql_3 = "INSERT INTO " . $plantname . "_lichtwerte (
            ID, Value, Timepoint
            ) VALUES (
            NULL, '$value_light', NOW()
        )";

        //execute all querys
        $result_1 = $conn->query($sql_1);
        $result_2 = $conn->query($sql_2);
        $result_3 = $conn->query($sql_3);

        //return success to post request
        echo json_encode(array(
            "success" => true
        ));
    }

    if(isset($_GET["test"])){
        class Testdata {
            private $id;
            private $name;
            public function __construct($ErrorID, $ErrorName){
                $this->id = $ErrorID;
                $this->name = $ErrorName;
            }
            public function expose() {
                return get_object_vars($this);
            }
        }
    
        $data[0] = (new Testdata(1, "Test"))->expose();
        $data[1] = (new Testdata(2, "Test"))->expose();
        
        
        echo json_encode($data);

    }


    //create function to check a parameter for sql injection
    function checkParameter($param){
        $param = stripslashes($param);
        $param = htmlspecialchars($param);
        $param = trim($param);

        //check values if the vars contain any xss related keywords
        $xss = array("script", "alert", "onload", "onerror", "onmouseover", "onmouseout", "onmousemove", "onmousedown", "onmouseup", "onkeydown", "onkeyup", "onkeypress", "onblur", "onchange", "onfocus", "onreset", "onselect", "onsubmit", "onabort", "onbeforeunload", "onerror", "onhashchange", "onload", "onpageshow", "onpagehide", "onresize", "onscroll", "onunload", "onmessage", "onconnect", "onopen", "onmessage", 
        //check if the vars contain any sql related keywords
        "select", "insert", "update", "delete", "drop", "alter", "create", "table", "from", "where", "not", "like", "between", "null", "group", "by", "order", "asc", "desc", "having", "limit", "offset", "union", "into", "values", "set", "truncate", "primary", "key", "foreign", "references", "default", "auto_increment", "index", "unique", "constraint", "check", "collate", "character", "set", "database", "schema", "procedure", "function", "trigger", "view", "grant", "revoke", "begin", "commit", "rollback", "savepoint", "lock", "unlock", "start", "transaction", "declare", "case", "when", "then", "else", "end", "if", "else", "elseif", "endif", "iterate", "leave", "loop", "repeat", "until", "while", "open", "close", "fetch", "cursor", "declare", "handler", "condition", "signal", "get", "diag", "row_count", "found", "not_found", "last_insert_id", "sqlstate", "warning", "exception", "show", "explain", "desc", "pragma", "pragma", "table_info", "index_list", "index_info", "collation_list", "collation", "foreign_key_list", "trigger_list", "trigger", "view_list", "view", "table", "column", "index", "trigger", "view", "pragma", "foreign_key", "database", "schema", "table");

        $flag = 0;
        foreach($xss as &$element){
            if(preg_match("/" . $element . "/", $param) === 1){
                $flag = 1;
                break;
            }
        }
        
        if($flag===0){
            //didn't match any expressions
            exit("Don't try injecting sql please. :( ");
        }

        return $param;
    }
   
?>