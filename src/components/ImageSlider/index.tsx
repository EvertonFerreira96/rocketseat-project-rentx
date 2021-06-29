import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { FlatList, View, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import {
     Container,
     ImageIndexes,
     CarImageWrapper, 
     CarImage,
    } from './styles';


interface ImageSliderProps {
    imagesUrl: {
      id: string; 
      photo: string;
    }[];
} 

interface ChangeImageprops {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const indexChanged = useRef((info: ChangeImageprops) => 
  {
    const index = info.viewableItems[0].index!;
    setImageIndex(index)
    
  }); 
  return (
      <Container>
          <ImageIndexes>
            {
              imagesUrl.map((item, index) => (
                <Bullet 
                  key={item.id} 
                  active={index === imageIndex} /> 
              ))
            }
          </ImageIndexes> 
        
        <FlatList
          data={imagesUrl}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
          renderItem={({ item }) => (
            <CarImageWrapper>
              <CarImage source={{ uri: item.photo }} resizeMode="contain" /> 
            </CarImageWrapper>
          )
        }
        />
      </Container>
  );
}

export default ImageSlider;