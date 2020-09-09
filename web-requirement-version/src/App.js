import React, {Component} from 'react';
import './App.css';
import Axios from 'axios'

import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Summary from './components/Summary';
import Container from './components/Container';
import Card from './components/Card';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={'rows':[]};

    this.handleChange = this.handleChange.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
  }

  componentDidMount(){
    var searchResult = [];
    var url = "http://localhost:1234/trips"
      Axios.get(url).then(result=>{
          result.data.forEach(item=>{
          searchResult.push(item);
      })
    this.setState({'rows':searchResult});
    })
  }

  handleChange(event) {
    this.setState( {input: event.target.value} );
  }
  
  keyPressed(event) {
    if (event.key === "Enter") {
      if(event.target.value===""){
        this.componentDidMount();
      }else{
        this.searchKeyword(event.target.value);
      }
    }
  }

  searchKeyword = (keyword)=>{
    if(keyword!==""){
      var searchResult = [];
      var url = "http://localhost:1234/trips/keyword/"+keyword
      Axios.get(url).then(result=>{
          result.data.forEach(item=>{
          searchResult.push(item);
      })
    this.setState({'rows':searchResult});
    })
    }
  }

  searchTags = (tags)=>{
    
      var searchResult = [];
      var url = "http://localhost:1234/trips/tags/"+tags
      Axios.get(url).then(result=>{
          result.data.forEach(item=>{
          searchResult.push(item);
      })
    this.setState({'rows':searchResult});
    })
  }

  render(){
    return (
    <div className="App">
      <Header>
          เที่ยวไหนดี?
      </Header>

      <Searchbar type="text" placeholder="หาที่เที่ยวแล้วไปกัน . . ." 
      onChange={this.handleChange} 
      onKeyPress={this.keyPressed} />
      
      <Container>
      {this.state.rows.map((trip) =>
      <Card key={trip.eid}>
      <Summary
        tags={trip.tags}
        title={trip.title}
        description={trip.description}
        image={trip.photos}
        url={trip.url}
        tagsFunction={this.searchTags}
      />
    </Card>
       )}
       </Container>

    </div>
    
  );
  }
}

export default App;
