var mongoose = require('mongoose');
var Projects = require('./api/projects/models/project');

var projects =[{
        "title": "RESTaurant Manager",
        "slug": "restaurant-manager",
        "description": "This is one was my first complex personal project, composed by a web service with a web page to sell and paid meals,\
                        with two aditional web services to decentralize the work. I stopped this project for a while to learn more front-end technologies,\
                        but I will try to continue it right after I finish my personal web site and will try to connect them, for demonstration purposes.\
                        I've developed an architecture of a distributed system for a portal where restaurant managers can register their restaurants and control the menus and informations.\
                        I've created two more web services, to recreate the payment and buying of meal tokens."
    }, {
        "title": "HomeSec",
        "slug": "homesec",
        "description": "Made for my informatic and network security course, this project is composed by an access control manager,\
                        a web interface for interacting with the service and a controller with a REST interface for the service to comunicate with the IoT things inside the home network.",
        "img": {
            "url": "/static/imgs/home-sec.jpg",
            "alt": "HomeSec Main Image"
        }
    }, {
        "title": "MedDB",
        "slug": "meddb",
        "description": "Simple database management project, made with a bit of php and mostly sql. Presented as a simple multi-paged website, \
                        where you can manage the database information about hospital patients and the sensor/actuator devices associated to them, \
                        and also transfer a device to an other patient, or simply activate it if no one is using it."
    }, {
        "title": "Distributed Chat System",
        "slug": "distributed-chat-system",
        "description": "Message passing system combined with remote method invocation and a rest server, these are the 3 main topics of this project, \
                        unfortunately the professor didn't like the RMI part and because of it, and a few minor bugs, the project wasn't perfect. \
                        With an HTML/REST server allocated on the google app engine cloud, using it's database, some chat servers comunicate with it \
                        using http requests, after getting the methods to do so from a main server using RMI (now I see how overkill it was) and it \
                        sent the messeges and also the information about the users, servers and chat rooms. The clients would then comunicate with a \
                        chat server pushing a message by 0MQ and the server would publish to all the subscribed clients."
    }];


mongoose.connect("0.0.0.0:27017/my-website");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to server");

    Projects.remove({}, function (err, resp) {
        if (err)
            console.log("Error deleting projects");
        else{
            console.log("Deleted existing projects");
            var count = 0;

            for(var i = 0; i < projects.length; i++){
                var project = new Projects();
                project.title = projects[i].title;
                project.slug = projects[i].slug;
                project.img = projects[i].img;
                project.description = projects[i].description;
                
                project.save(function (err, project) {
                    if (err){
                        console.log(err);
                    } else {
                        count++;
                        if(count == projects.length)
                            db.close();
                    }
                });
            }
        }
    });
});
