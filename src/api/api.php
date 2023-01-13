<?php
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

    }else{
        echo "Productionmode";
    }

   
?>