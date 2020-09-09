import React from 'react';

import H1 from '../H1';
import P from '../P';
import Wrapper from './Wrapper';
import ImgWrapper from './ImgWrapper';
import Link from './Link';
import Tags from './Tags';
import ContinueReading from './ContinueReading';

import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';

function Summary({tags, title, description, url, image, tagsFunction}) {
  return (
    <Wrapper>
       <ImgWrapper>
  <AwesomeSlider cssModule={AwesomeSliderStyles} bullets={false}>
    {image.map((image,key) =>
      <div data-src={image} key={key}/>
    )}
  </AwesomeSlider>
  </ImgWrapper>
        <H1><Link href={url}>{title}</Link></H1>
        {tags.map((tag,key) =><Tags onClick={(event)=>{tagsFunction(event.target.text)}} key={key}>{tag} </Tags>)}
        <P>{description}</P>
        <ContinueReading href={url}>Continue Reading &rarr;</ContinueReading>
    </Wrapper>
  );
}

export default Summary;