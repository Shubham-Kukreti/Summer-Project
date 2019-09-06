const express  = require('express');
const app = express();
const server  = require('http').createServer(app);
const socketIO=require('socket.io');
let bodyParser = require('body-parser');
let crypto = require('crypto-js');
let mongoClient=require('mongodb').MongoClient;

var io=socketIO(server);

var movies=['Mission Mangal','Batla House','Saaho','Kabir Singh','Once Upon A Time In Hollywood','Fast & Furious: Hobbs & Shaw','The Angry Birds Movie 2']

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

//      'Batla House':{
//           'synopsis':`Based on the 2008 Delhi Batla House case, the crime thriller Batla House chronicles the police encounter and investigation of the case.`,
//           'duration':'2 hrs 26 mins',
//           'releasing':' 15 Aug, 2019',
//           'rating':'81%',
//           'type':'Drama',
//           'certi':'UA',
//           'lang':'Hindi',
//           'imgUrl':'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201908/Batla-House-770x433.jpeg?EBRzCpcMPtKuJJvZ4eEz_9B2j6V.WT.o'
//      },

//      'Saaho':{
//           'synopsis':`Saaho is a multi-lingual movie starring Prabhas and Shraddha Kapoor in prominent roles. The cast also includes Neil Nitin Mukesh and Jackie Shroff. It is a drama directed by Sujeeth with Shankar Mahadevan, Ehsaan Noorani and Loy Mendonsa as the music composers, forming part of the crew. `,
//           'duration':'2 hrs 30 mins',
//           'releasing':'30 Aug, 2019',
//           'rating':'82%',
//           'type':'Action,Thriller',
//           'certi':'UA',
//           'lang':'Hindi,Telugu,Tamil,Malayalam',
//           'imgUrl':'https://s3.ap-south-1.amazonaws.com/hansindia-bucket/h-upload/feeds/2019/07/25/199218-saaho.jpg'
//      },

//      'Kabir Singh': {
//           'synopsis':`A brilliant yet impulsive young surgeon falls into a path of self-destruction after the love of his life is forced to marry another man.`,
//           'duration':'2 hrs 55 mins',
//           'releasing':'21 Jun, 2019 ',
//           'rating':'85%',
//           'type':'Action,Drama,Romantic',
//           'certi':'A',
//           'lang':'Hindi',
//           'imgUrl':'http://www.magnetothemall.com/wp-content/uploads/2018/12/Kabir-Singh-%E2%80%93-Movie-Poster-Shahid-Kapoor-Kiara-Advani-Sandeep-Reddy-Vanga-Poster-Design-In-Photoshop-Thumbnail.jpg'
//      },

//      'Once Upon A Time In Hollywood':{
//           'synopsis':`Los Angeles, 1969. As the final chapter of Hollywood's golden age draws to a close, fading TV star Rick Dalton (Leonardo DiCaprio) and his longtime stunt double Cliff Booth (Brad Pitt) make their way around an industry they hardly recognize anymore.

//           The ninth film from Quentin Tarantino features an ensemble cast and multiple storylines, and is a glowing tribute to the memories of a bygone era.`,
//           'duration':'2 hrs 41 mins',
//           'releasing':'15 Aug, 2019',
//           'rating':'78%',
//           'type':'Comedy,Drama',
//           'certi':'A',
//           'lang':'English',
//           'imgUrl':'https://radioimg.s3.amazonaws.com/mix947/styles/delta__775x515/s3/onceUponATimeInHollywood775x515.png?5g0YTyeiP0u4.GRwAR32kfHegyXVmCzB&itok=V96XV35a'
//      },

//      'Fast & Furious: Hobbs & Shaw':{
//           'synopsis':`When a cyber-genetically enhanced terrorist comes dangerously close to weaponising a deadly virus, arch-rivals Luke Hobbs and Deckard Shaw are left with no choice but to team up against the imminent threat.`,
//           'duration':'2 hrs 16 mins',
//           'releasing':'02 Aug, 2019',
//           'rating':'82%',
//           'type':'Action,Adventure,Comedy',
//           'certi':'A',
//           'lang':'English,Hindi,Tamil,Telugu',
//           'imgUrl':'http://ecdn.banglatribune.com/contents/cache/images/825x0x1/uploads/media/2019/08/05/dbef004995f2486573cd253540961bd6-5d47d6b1d86ad.jpg'
//      },

//      'The Angry Birds Movie 2':{
//           'synopsis':`The epic battle between the grumpy bunch of flightless birds and the crafty green pigs reaches the next level in this sequel to the hit 2016 film.`,
//           'duration':'1 hrs 36 mins',
//           'releasing':' 23 Aug, 2019',
//           'rating':'75%',
//           'type':'Animation,Comedy',
//           'certi':'U',
//           'lang':'Enlish,Hindi,Telugu,Tamil',
//           'imgUrl':'http://genknews.genkcdn.vn/thumb_w/640/2019/6/21/anh-1-1561096560686519836335.jpg'
//      },



// }

// mongoClient.connect(mdkey,(err,db)=>{
//      if(err) throw err;
//      var dbo=db.db('movieOn');
//      dbo.collection('MovieName').insertOne({mName:movies},(err,result)=>{
//      if(err) throw err;
               
//      })
               
// })
          
         
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




// app.post('/upcoming',(req,res)=>{
//      res.send({'infoL': Upcoming})
//    })
   


server.listen(6000,(req,res)=>{
    console.log("server is listening to port number 6000")
  })
  
  //mongodb+srv://shubham:<password>@cluster0-jlphs.mongodb.net/test?retryWrites=true&w=majority