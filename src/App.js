import React from 'react';
import Plot from 'react-plotly.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      closestX: [],
      closestY: [],
      color: [],
      loadNewGraph: false
  }

}
  render() {

  
    return (
      <div>
      <Plot
        data={[
          {
            x: [124, 270, 375,105,155,60,25,40,100,204,125,30,90,50],
            y: [23, 60, 320,50,20,70,11,15,200,100,142,250,20,150],
            type: 'line',
            mode: 'markers',
            marker: {
              size: 10,
              color: 'red',
          },
          },
        ]}
        layout={{width: 800, height: 540, title: 'Initial Plot'}}
        onClick ={this.mapClick}
      />

      {this.state.loadNewGraph ?
        <Plot
          data={[
            {
              x: this.state.closestX,
              y: this.state.closestY,
              type: 'line',
              mode: 'markers',
              marker: {
                size: 10,
                color: this.state.color,
            },
            },
          ]}
          layout={{width: 800, height: 540, title: 'Closet Point Plot'}}
        />
        :
        ''        
      }
    </div>
    );
  }
  
  mapClick=(params)=> {
    const distance = [];
    const newX = [];
    const newY = [];
    const color = [];
    const clickPoint = [params.points[0].x,params.points[0].y];
    const x = params.points[0].data.x;
    const y = params.points[0].data.y;

    //finding distance form selected point to every point 
    for (let i = 0; i < x.length; i++) {
      let d = Math.sqrt( Math.pow( (clickPoint[0]-x[i]),2 ) + Math.pow( (clickPoint[1]-y[i]),2));
      if(d!=0){
        distance.push({
          key:i,
          value:d
        });
      }      
      color.push('red')
    }

    //sort by distance
    distance.sort((a, b) => (a.value > b.value) ? 1 : -1)

    //get closest three point 
    for (let i = 0; i < 3; i++) {
      newX.push(x[distance[i].key]);
      newY.push(y[distance[i].key]);
      color[distance[i].key] = 'green';
    }

    console.log(color)

    //update state value with new data value
    this.setState({
      closestX:x,
      closestY:y,
      color,
      loadNewGraph:true
    })
    
  }
}

export default App;
