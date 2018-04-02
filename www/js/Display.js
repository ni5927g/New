
var db;
var address;
var msg = ""

//Open parabase Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.sqlitePlugin.openDatabase({ name: "Database.db", location: 'default' });
}

function Lookup() {

      // creating a table here if it already exists then it would just get a reference to that table otherwise it will create it.
    var property = document.getElementById("property_type").value;
    db.transaction( 
        function (transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS Property ( id integer primary key autoincrement , rent text, name text , bedroom text, date text unique , property text , furniture text , notes text , selfie text )', [],
                function (tx, result) {
                   
                },
                function (error) {
                    alert("Something went wrong during the creation of the table");
                });
        });
    msg = "";
    var para = document.getElementById("display");
    
    // looking for data in the db
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM Property where property = ?', [property], function (tx, data) {
            var len = data.rows.length;
            // location variable will be used to store the location of the user. The latitude and langitude fields will be added to it after fetching their values from the db.
         
           
            if (len < 1 )
            {
                para.innerHTML = "There are no enteries against the respective category";
            }
            var i;
            for (i = 0; i < len; i++) {
          

                
              
 msg += "<br /> Entry ID: " + data.rows.item(i).id
                        + "<br/> Property Type: " + data.rows.item(i).property
                         + "<br/> Reporter:  " + data.rows.item(i).r_name
                         + "<br/> Date:  " + data.rows.item(i).date_time
                         + "<br/> Bedrooms:  " + data.rows.item(i).bed_count
                         + " <br/> Rent: " + data.rows.item(i).money
                                        if (data.rows.item(i).notes != "")
                        msg += "<br/> Note:  " + data.rows.item(i).notes;

                    if (data.rows.item(i).furnishing != "")
                        msg += "<br/> Furniture Type: " + data.rows.item(i).furnishing;


                    
                // displaying the image after getting the address of the image from the database.
                    msg += "<br /><br /><input type='image' src= '" + data.rows.item(i).selfie+"' alt='Image not found!!' width='180' height='180'>"
                }
            // para.innerHTML will display all the data on the screen.
            if (msg != "")
                para.innerHTML = msg;
        }, null);
    });

}
