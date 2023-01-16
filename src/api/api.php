<?php
$servername = "localhost:3306";
$username = "Noah";
$password = "passwort";
$dbname = "se";

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    header("Pragma: undefined");
    header('Content-Type: application/json');
    
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

    if(isset($_GET["query"])){

        //check if query is valid
            $allowed = ['/([a-z0-9]*)feuchtigkeitswerte/','/([a-z0-9]*)temperaturwerte/','/([a-z0-9]*)lichtwerte/'];
            $flag = 0; 
            foreach($allowed as &$element){
                if(preg_match($element, $_GET["query"]) === 1){
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

        //make db connection
            //connect to mysql server
            

            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
        //create query
        $query = "SELECT * FROM  ". $_GET["query"];
           // echo $query;
            
        $data = array();

        if($result = $conn->query($query)){
             //create data 
            while ($obj = $result->fetch_object()) {
                array_push($data, (new Datapoint($obj->ID, $obj->Timepoint, $obj->Value))->expose());
            }
            $result->free_result();
        }

        $conn->close();

        
    
       //$data[0] = (new Datapoint("28. Februar 2022", 1))->expose();
        //$data[1] = (new Datapoint("29. Februar 2022", 1))->expose();
        
        
        echo json_encode($data);
    }

   
?>