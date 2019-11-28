const express  = require('express');
const app = express();
const server  = require('http').createServer(app);
let bodyParser = require('body-parser');
let crypto = require('crypto-js');
let mongoClient=require('mongodb').MongoClient;


//var movies=[['21 Bridges','latest'],['Ford V Ferrari','latest'],['Pagalpanti','latest'],['Frozen 2','latest'],['Marjaavaan','latest'],['Joker',""],['Bala','latest'],['Mission Mangal',''],['Housefull 4','']]

var mdkey="mongodb+srv://shubham2:shubham98@cluster0-jlphs.mongodb.net/test?retryWrites=true&w=majority";


//mongo connectivity
var mongoUrl= "mongodb://localhost:27017/"

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(bodyParser.json({limit: '50mb',extended: true}))

const myKey="ticket";

// var movieData={
//      'Mission Mangal':{
//           'synopsis':`Inspired by true events that led up to ISRO's Mars Orbiter Mission (Mangalyaan), the film tells the story of a group of scientists who overcame their professional and personal tribulations to mastermind the greatest accomplishment in Indian space history. 

//           Mission Mangal is a tale of ordinary people doing extraordinary things and inspiring generations to dream big and achieve the impossible.
//           `,
//           'duration':'2 hrs 13 mins',
//           'releasing':'15 Aug,2019',
//            'rating':'86%',
//            'type':'Drama',
//            'certi':'U',
//            'lang':'Hindi',
//            'imgUrl':'https://1.bp.blogspot.com/-uTjHvbo7lpI/XS2DmlrP_dI/AAAAAAAAAO8/T0AUWYCqMUkXC6M_oEMcQaw8rRCmt-ehwCLcBGAs/s640/mission-mangal-movie-poster.jpg'
//      },

//      'Bala':{
//           'synopsis':`The film tells the story of Bala (Ayushmann Khurana) a man who is balding prematurely and how he copes with the situation. The film also narrates Bala's relationship with two women played by Yami Gautam and Bhumi Pednekar respectively.`,
//           'duration':'2 hrs 09 mins',
//           'releasing':' 8 Nov, 2019',
//           'rating':'80%',
//           'type':'Comedy,Drama',
//           'certi':'UA',
//           'lang':'Hindi',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj2ourgrozmAhWKxosBHV2BDu0QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.scrabbl.com%2F-bala-official-trailer-makes-you-rofl-ayushmann-khurrana-strives-with-baldness-in-this-satirical-comedy&psig=AOvVaw1PeuPvNfjiayE_XU63lLRw&ust=1575011830778614'
//      },

//      '21 Bridges':{
//           'synopsis':`Two cop killers are on the loose and a citywide manhunt is on for the criminals. In the middle of the mayhem is a diligent NYPD detective, who is determined to track them down at all costs. As all of Manhattan's 21 bridges are shut down and the situation spirals out of control, he soon becomes unsure of who to pursue - and who is in pursuit of him. `,
//           'duration':'1 hrs 42 mins',
//           'releasing':'22 Nov, 2019',
//           'rating':'74%',
//           'type':'Drama,Thriller',
//           'certi':'A',
//           'lang':'English',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjCzMGer4zmAhUlL6YKHXxTCdEQjRx6BAgBEAQ&url=https%3A%2F%2Fynuk.tv%2F2019%2F05%2F07%2F21-bridges-trailer%2F&psig=AOvVaw1VvW9QhdMNk6nx7ZsLTPfZ&ust=1575011994601265'
//      },

//      'Ford V Ferrari': {
//           'synopsis':`Academy Award-winners Matt Damon and Christian Bale star in Ford v Ferrari, based on the remarkable true story of the visionary American car designer Carroll Shelby (Damon) and the fearless British-born driver Ken Miles (Bale), who together battled corporate interference, the laws of physics, and their own personal demons to build a revolutionary race car for Ford Motor Company and take on the dominating race cars of Enzo Ferrari at the 24 Hours of Le Mans in France in 1966.`,
//           'duration':'2 hrs 35 mins',
//           'releasing':'15 Nov, 2019 ',
//           'rating':'93%',
//           'type':'Action,Biography,Drama',
//           'certi':'UA',
//           'lang':'English',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi0r_fMr4zmAhUPx4sBHeNuAaYQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.metaflix.com%2Fmovie-news%2F2019%2F6%2F3%2Ffirst-poster-trailer-for-ford-v-ferrari-starring-matt-damon-and-christian-bale&psig=AOvVaw1xqmq6oVw9qrdebhZqR5R-&ust=1575012133053470'
//      },

//      'Pagalpanti':{
//           'synopsis':`A group of tourists from India set out on a vacation only to have the trip turn into a patriotic mission. Can they pull it off?`,
//           'duration':'2 hrs 32 mins',
//           'releasing':'22 Nov, 2019',
//           'rating':'64%',
//           'type':'Comedy',
//           'certi':'UA',
//           'lang':'Hindi',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiXu8D7r4zmAhVDwosBHcTrCYYQjRx6BAgBEAQ&url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Fentertainment%2Fhindi%2Fbollywood%2Fnews%2Fpagalpanti-ahead-of-the-trailer-release-ileana-dcruz-teases-her-fans-with-quirky-new-posters%2Farticleshow%2F71699371.cms&psig=AOvVaw2WSirgVzv8ATbhbIYvn7nh&ust=1575012197039682'
//      },

//      'Frozen 2':{
//           'synopsis':`Three years after the events of Frozen, Elsa begins to hear strange voices calling to her from the forest and all of a sudden Arendelle finds itself in danger. Elsa, Anna, Kristoff, Olaf and Sven must go beyond Arendelle to find the origin of Elsa's powers and save their kingdom.`,
//           'duration':'1 hrs 43 mins',
//           'releasing':'22 Nov, 2019',
//           'rating':'85%',
//           'type':'Animation,Adventure,Comedy',
//           'certi':'U',
//           'lang':'English,Hindi,Tamil,Telugu',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi5mNbytIzmAhU9x4sBHWsLDBIQjRx6BAgBEAQ&url=https%3A%2F%2Fmovies.disney.com%2Ffrozen-2&psig=AOvVaw2Ygy1JN4ECkBk5bP9Spx9V&ust=1575013554621719'
//      },

//      'Marjaavaan':{
//           'synopsis':`Marjaavaan is a story of love birds Raghu and Zoya enjoying their lives until a vertically challenged gang leader with harmful intentions turns their world upside down.`,
//           'duration':'2 hrs 17 mins',
//           'releasing':'15 Nov, 2019',
//           'rating':'70%',
//           'type':'Action,Drama,Romantic',
//           'certi':'UA',
//           'lang':'Hindi',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjY_oXDtYzmAhVxGaYKHRSwAiwQjRx6BAgBEAQ&url=https%3A%2F%2Feconomictimes.indiatimes.com%2Fmagazines%2Fpanache%2Fmarjaavaan-review-clichd-narrative-feels-out-of-place-in-the-current-slick-bwood%2Farticleshow%2F72104933.cms&psig=AOvVaw3U23HI8gioHZURHYJqJ5DA&ust=1575013646946328'
//      },

//      'Housefull 4':{
//           'synopsis':`When 6 lovers are parted because of conspiracy and revenge in the year 1419, the characters cross paths again in 2019. However, in the present life the 3 boys are about to marry their sisters-in-law and the pairings are in the wrong order. Destiny repeats itself when the 3 couples who are choosing their wedding destination all land up in Sitamgarh again, where it all began. Will they remember their past lives in time for marriage or will they be stuck with the wrong lovers forever? Housefull 4 is coming to confuse you, put you on a laughing riot and take you through the grandeur of 1419 with a spark of 2019. Come & witness this Epic Reincarnation Comedy.`,
//           'duration':'2 hrs 22 mins',
//           'releasing':'25 Oct, 2019',
//           'rating':'68%',
//           'type':'Comedy,Fantasy',
//           'certi':'UA',
//           'lang':'Hindi',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiQmev7tYzmAhVSyosBHW4HDUkQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.thestatesman.com%2Fentertainment%2Fhousefull-4-makers-release-another-poster-1502803761.html&psig=AOvVaw1IvDHybadvlEl41SFhHVaR&ust=1575013796865597'
//      },

//      'Joker':{
//           'synopsis':`Arthur Fleck, a man struggling with loneliness and isolation, wears two masks. One, he paints on for his day job as a clown. The other is a guise he projects in an attempt to find his place in Gotham City's fractured society. Caught in a cyclical existence between apathy and cruelty, Arthur begins to make one bad decision after another. What follows is a new take on the origin story of one of cinema's most iconic villains.`,
//           'duration':'2 hrs 04 mins',
//           'releasing':'04 Oct, 2019',
//           'rating':'86%',
//           'type':'Crime,Fantasy,Thriller',
//           'certi':'A',
//           'lang':'English',
//           'imgUrl':'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjf9LqutozmAhVkIqYKHZDODeEQjRx6BAgBEAQ&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttps%253A%252F%252Ffilmspell.com%252Fjoker2019-movie-review-unabashedly-champions-evil%252F%26psig%3DAOvVaw0bjxBsVRCucTIETcl7WKE1%26ust%3D1575013906502771&psig=AOvVaw0bjxBsVRCucTIETcl7WKE1&ust=1575013906502771'

//      }



// }

// mongoClient.connect(mdkey,(err,db)=>{
//      if(err) throw err;
//      var dbo=db.db('movieOn');
//      dbo.collection('MovieName').insertOne({mName:movies},(err,result)=>{
//      if(err) throw err;
               
//      })
               
// })

// mongoClient.connect(mdkey,(err,db)=>{
//      if(err) throw err;
//      var dbo=db.db('movieOn');
//      dbo.collection('movieData').insertOne({Mdata:movieData},(err,result)=>{
//      if(err) throw err;
               
//      })
               
// })

//  app.post('/searchMovie',(req,res)=>{
//      mongoClient.connect(mdkey,(err,db)=>{
//           if(err) throw err;
//           var dbo=db.db('movieOn');
//           dbo.collection('MovieName').findOne({mName[0]:req.body.mName},(err,result)=>{
//           if(err) throw err;

//           else if(result==null){
//                res.send({'status':'notFound'})
//           }
//           else{
//                req.send({'status':'found'})
//           }
                    
//           })
                    
//      })
     
//  })         
         





 app.post('/sendData',(req,res)=>{
     mongoClient.connect(mdkey,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('movieOn');
          dbo.collection('movieData').findOne({},(err,result)=>{
               if(err) throw err;
               res.send(result.Mdata[req.body.mName])
          })
     })
     

})
 
 

app.post('/search',(req,res1)=>{
     var y=0;
     mongoClient.connect(mdkey,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('movieOn');
          dbo.collection('MovieName').findOne({},(err,result)=>{
          if(err) throw err;
           
          for(var i=0;i<result.mName.length;i++)
          {
             if(result.mName[i][0]==req.body.mName)
              { 
                 y=1;
              }

          }
          
          if(y==1)
          res1.send({'status':'found'})
          else{                
          res1.send({'status':'notFound'})
          }
               
          
                 
          })

     })
})


app.post('/booked',(req,res)=>{
     var d=new Date().getDate();
     mongoClient.connect(mdkey,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('movieOn');
          dbo.collection('UserInfo').updateOne({UserName:req.body.UserName},{$set:{BookedTickets:1}},(err,result)=>{
               if(err) throw err;
          })
          dbo.collection('BookingHistory').insert({UserName:req.body.UserName,Movie:req.body.mName,ShowTime:req.body.sTime,SeatNo:req.body.Seat,Amount:req.body.amount,BookingTime:req.body.btime},(err,result)=>{
          if(err) throw err;
           
          else{
               res.send({'status':'booked'})
          }

          })
     })
})
     




app.post('/checkSeat',(req,res)=>{
     mongoClient.connect(mdkey,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('movieOn');
          dbo.collection('BookingHistory').findOne({SeatNo:req.body.seat,ShowTime:req.body.sTime,Movie:req.body.mName},(err,result)=>{
          if(err) throw error
          else if(result==null)
          res.send({'status':'sAvailable'})
          else 
          res.send({'status':'notAvailable'})
          })
     })
})




app.post('/signup',(req,res)=>{
     var d=new Date().getDate();
    var passE=crypto.SHA256(req.body.passwordS+myKey).toString();
     mongoClient.connect(mdkey,(err,db)=>{
        if(err) throw err;
        var dbo=db.db('movieOn');
        dbo.collection('UserInfo').findOne({UserName:req.body.uname},(err,result)=>{
             
             if(err) throw err;
            
             else if(result==null){
               dbo.collection('UserInfo').findOne({Email:req.body.email},(err,result2)=>{
                    if(err) throw err;
                    else if(result2==null){
                         dbo.collection('UserInfo').insert({FirstName:req.body.firstN,LastName:req.body.lastN,Email:req.body.email,UserName:req.body.uname,Password:passE,BookedTickets:""},(err,result)=>{
                         if(err) throw err;
                         res.send({'value':'registered'})
                         })
                    }
                    else{
                         res.send({'value':'EmailAlready'})
                    }
               })
               }
             
             else{
                 res.send({'value':'UsernameAlready'})
             }

            

        })
        
   })
})

app.post('/signIn',(req,res)=>{
    var PassE=crypto.SHA256(req.body.userPassword+myKey).toString()
     mongoClient.connect(mdkey,(err,db)=>{
        if(err) throw err;
        var dbo=db.db('movieOn');
        dbo.collection('UserInfo').findOne({UserName:req.body.userName,Password:PassE},(err,result)=>{
             if(err) throw err;  
  
             else if(result==null){
        
                  res.send({'token':'invalid'}) 
        }

              else{
                  var token=new Date().getDate()+myKey;
                  var token2=crypto.SHA256(token).toString();
                   res.send({'token':token2});
        
   }
        })
   })
})

app.post('/bookingHistory',(req,res)=>{
     
     mongoClient.connect(mdkey,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('movieOn');
          dbo.collection('UserInfo').findOne({UserName:req.body.uname},(err,result)=>{
               if(err) throw err;  
    
               else if(result.BookedTickets==""){
          
                    res.send({'status':'none'}) 
               }
               else{
                    dbo.collection('BookingHistory').find({UserName:req.body.uname}).toArray((err,val)=>{
                    
                    if(err) throw err;
                    
                    else{
                         res.send(val[val.length-1])
                         // res.send(val)
                   }
                   })
     }
          })
     })
})
// app.post('/showHistory',(req,res)=>{
//      mongoClient.connect(mongoUrl,(err,db)=>{
//           if(err) throw err;
//           var dbo=db.db('MyProject');
//      dbo.collection('BookingHistory').findOne({UserName:req.body.UserName},(err,result)=>{
//           res.send(result)

//      })  
//      })
// })



app.post('/delete',(req,res)=>{
  mongoClient.connect(mdkey,(err,db)=>{
       if(err) throw err;
       var dbo=db.db('movieOn');
       dbo.collection('UserInfo').deleteOne({UserName:req.body.DUser},(err,result)=>{
            if(err) throw err;

            res.send({'status':'deleted'})
       })
  })

})

app.post('/verifyToken',(req,res)=>{
     var todayToken=crypto.SHA256(new Date().getDate()+myKey).toString();

     if(req.body.token==todayToken){
          res.send({'status':'valid'})
     }
     else{
          res.send({'status':'invalid'})
     }
})

app.post('/forgot',(req,res)=>{
     var PassE=crypto.SHA256(req.body.passwordS+myKey).toString()
     mongoClient.connect(mdkey,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('movieOn');
          dbo.collection('UserInfo').findOne({UserName:req.body.uname},(err,result)=>{


               if(err) throw err;

               else if(result==null)
               {
                    res.send({'status':'notRegistered'})
               }
               else{
                   
                    dbo.collection('UserInfo').updateOne({UserName:req.body.uname},{$set:{Password:PassE}},(err,result)=>{
                         if(err) throw err;

                         res.send({'status':'successful'})
                    })
               }
               
               
          })
     })   
})


// app.post('/sendList',(req,res)=>{
//      res.send({'Name': movies}) 
// })




// app.post('/upcoming',(req,res)=>{
//      res.send({'infoL': Upcoming})
//    })
   
app.post('/sendList',(req,res)=>{
     mongoClient.connect(mdkey,(err,db)=>{
          if(err) throw err;
          var dbo=db.db('movieOn');
          dbo.collection('MovieName').findOne({},(err,result)=>{
          if(err) throw err;
          //console.log(result.mName)
          res.send({'Name': result.mName})        
          })
                    
     })
     
})




server.listen(6000,(req,res)=>{
    console.log("server is listening to port number 6000");
  })
  
  //mongodb+srv://shubham:<password>@cluster0-jlphs.mongodb.net/test?retryWrites=true&w=majority