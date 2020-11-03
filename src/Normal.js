import React ,{Component,useEffect,useState}from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.css';
import { Tab } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {  Item } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react';
import { Label } from 'semantic-ui-react'

const  toISOLocal = (d) => {
  var z  = n =>  ('0' + n).slice(-2);
  var zz = n => ('00' + n).slice(-3);
  var off = d.getTimezoneOffset();
  var sign = off < 0? '+' : '-';
  off = Math.abs(off);

  return d.getFullYear() + '-'
         + z(d.getMonth()+1) + '-' +
         z(d.getDate()) + ' ' +
         z(d.getHours()) + ':'  + 
         z(d.getMinutes()) + ':' +
         z(d.getSeconds())
}

const Status = (props)=>{
  let length = parseInt(props.length);
  let status = <h3>{toISOLocal(new Date())} - <Label color='green' >Optimal</Label></h3>;
  const [reports , setReports] = useState([status]);
  const [time, setTime] = useState(Date.now());
  let text ='Optimal'
  let color = 'green';
  let timetillnow= 0;
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
      let temp = toISOLocal(new Date())
      if(timetillnow<((length)/4)){
        color = 'yellow';
        text='Normal'
      }else if(timetillnow<((length)/3)){
        color = 'red';
        text='Blocked'
      }
      else if(timetillnow<((length)/2)){
        color = 'brown';
        text='Danger'
      }
      else if(timetillnow>length){
        timetillnow = 0;
        color = 'green';
        text ='Optimal'
      }

    status = <h3 id={`${temp}_${length}`}>{temp} - <Label color={color} >{text}</Label></h3>;
      reports.push(status);
      let x = [...reports]
      console.log(x)
      setReports(x)
      setTimeout(()=>{
        var elmnt = document.getElementById(`${temp}_${length}`);
        if(elmnt)
        elmnt.scrollIntoView(false);
      },100)
      timetillnow = timetillnow+ 5000
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return(reports.map(r=>r)  )
}

export default function Normal () {
  
  const ItemExampleImages = () => (
  <Item.Group divided>
    <Item>
      <div >
        <video  style={{width:'500px'}} autoPlay="true" muted="true"  loop="true" src="/video4.mp4" />
      </div>
      <Item.Content style={{padding:'10px',marginLeft:'50px'}} >
          <Item.Header as='a'>Miyapur Nala</Item.Header>
          <Item.Meta>Miyapur to DSNR Status</Item.Meta>
          <Item.Description>
            <div style={{overflowY:'auto',height:'200px'}} >
                <Status length="208000" />
            </div>
          </Item.Description>
        </Item.Content>
    </Item>
       
    <Item>
      <div >
        <video  style={{width:'500px'}} autoPlay="true" muted="true" loop="true" src="/video2.mp4" />
      </div>
      <Item.Content style={{padding:'10px',marginLeft:'50px'}} >
          <Item.Header as='a'>Ameerpet Nala</Item.Header>
          <Item.Meta>Miyapur to DSNR Status</Item.Meta>
          <Item.Description>
            <div style={{overflowY:'auto',height:'200px'}} >
                <Status length="65000" />
            </div>
          </Item.Description>
        </Item.Content>
    </Item>

  </Item.Group>
)

const mapprops = {
  center: {
    lat: 17.3949348, lng: 78.4978627 
  },
  zoom: 12
};
var myStyle = [
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      { visibility: "on" }
    ]
  },{
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "water",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];
const handleApiLoaded = (map, maps) => {
  const trafficLayer = new window.google.maps.TrafficLayer();
  trafficLayer.setMap(map);
  map.mapTypes.set('mystyle', new window.google.maps.StyledMapType(myStyle, { name: 'Drainage Map' }));
};
const panes = [
  { menuItem: 'Map View', render: () => 
  <div>
   {/* <div style={{height:'80vh',width:'95vw'}} id="map"></div> */}
   <div style={{ height: '75vh', width: '95vw' }}>
   <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAGfSGCpgFMATldc7Uoqbru6MoVc9ob7-E" }}
          defaultCenter={mapprops.center}
          defaultZoom={mapprops.zoom}
          yesIWantToUseGoogleMapApiInternals
          mapTypeId= 'mystyle'
          mapTypeControlOptions={{
            "mapTypeIds": ['mystyle']
          }}
          options={{styles: myStyle, disableDefaultUI: true}}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          
    </GoogleMapReact>
    </div>
    <br />
    <div style={{    width: "100vw"}} >    
    <Label color='brown' >
          Drainage Flow At Danger
     </Label>
    <Label color='red' >
          Drainage Flow Blocked
     </Label>
     <Label color='yellow' >
          Drainage Flow Normal
     </Label>
     <Label color='green' >
          Drainage Flow Optimal
     </Label>
    </div>
</div>
},
  { menuItem: 'Real Time Video', render: () => 
  <Tab.Pane>
    <ItemExampleImages />
  </Tab.Pane> }
]
useEffect(()=>{
  setTimeout(()=>{
    if(document.querySelector('video'))
    document.querySelector('video').defaultPlaybackRate = 2.0;
  },5000)
},[])
  return (
    <div style={{padding:'50px'}} >
      <h1 style={{textAlign:'center'}}>Real Time Drainage Monitoring System</h1>
      <Tab menu={{ secondary: true, pointing: true }}  panes={panes} />
    </div>
    
  );
}

