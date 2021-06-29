
import SpeedPicture from '../assets/images/speed.svg';
import AccelerationPicture from '../assets/images/acceleration.svg';
import ForcePicture from '../assets/images/force.svg';
import GasolinePicture from '../assets/images/gasoline.svg';
import EnergyPicture from '../assets/images/energy.svg';
import Hybridicture from '../assets/images/hybrid.svg';
import ExchangePicture from '../assets/images/exchange.svg';
import PeoplePicture from '../assets/images/people.svg';
import CarPicture from '../assets/images/car.svg';

export function getCarAccessoryIcon(type: string){
    switch(type){
        case 'speed': 
            return SpeedPicture; 
        case 'acceleration': 
            return AccelerationPicture; 
        case 'turning_diameter': 
            return ForcePicture; 
        case 'gasoline_motor': 
            return GasolinePicture; 
        case 'eletric_motor': 
            return EnergyPicture; 
        case 'hybrid_motor': 
            return Hybridicture; 
        case 'exchange': 
            return ExchangePicture; 
        case 'seats': 
            return PeoplePicture; 
        default: 
            return CarPicture; 
    }
}