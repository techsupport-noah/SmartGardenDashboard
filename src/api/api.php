<?php
    
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
            public function toJSON(){
                return json_encode($this->expose());;
            }
        }
    
        $data = new Testdata(1, "Test");
        
        echo $data->toJSON();
    }else{
        echo "Productionmode";
    }

   
?>