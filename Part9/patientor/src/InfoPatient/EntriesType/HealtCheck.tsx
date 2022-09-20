import { HealthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const  HealtCheck = (entry : HealthCheckEntry) => {
  const setColorHeart = (rating: number) => {
    switch(rating){
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "#5F6A6A";  
    }
  };
  
  return (
    <div> 
      {entry.date} <MedicalServicesIcon /> <br />
      <i>{entry.description}</i> <br />
      <FavoriteIcon sx={{color: setColorHeart(entry.healthCheckRating)}} /> <br />
    </div>
  );
};

export default HealtCheck;