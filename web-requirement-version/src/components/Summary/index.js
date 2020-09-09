import React from 'react';
import { Row,Col,Container,BR } from 'react-bootstrap';

import H1 from '../H1';
import P from '../P';
import Link from './Link';
import Tags from './Tags';
import ContinueReading from './ContinueReading';
import BigImage from '../BigImage';
import SmallImage from '../SmallImage';

function Summary({tags, title, description, url, image, tagsFunction}) {
  
  
  return (

<Container>
  <Row>
    <Col>
    
  <BigImage src={image[0]} />
    {image.map((image,key) =>
      <div data-src={image} key={key}/>
    )}
  
    </Col>

    <Col>
    <H1><Link href={url}>{title}</Link></H1>
        <P>{description.substring(0,380)}. . . 
          <ContinueReading href={url}>อ่านต่อ &rarr;</ContinueReading> 
        </P>
        
        หมวดหมู่: {tags.map((tag,key) =><Tags onClick={(event)=>{tagsFunction(event.target.text)}} key={key}>{tag} </Tags>)}

        <br/>
        {image.map((image,key) => {
          if(key!==0){
            return <SmallImage src={image} key={key}/>
          }
        }
        )}
    </Col>
  </Row>
</Container>
  );
}

export default Summary;