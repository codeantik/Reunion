import './styles.css';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GradeIcon from '@mui/icons-material/Grade';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import HotTubIcon from '@mui/icons-material/HotTub';
import RoofingIcon from '@mui/icons-material/Roofing';


export const Card = ({ item }) => {

    const [liked, setLiked] = useState(false)
    // const propertyTypes = ["House", "Guest House", "Apartment", "Villa", "Condo"]

    // const getRandom = (max, min) => {
    //     min = Math.ceil(min)
    //     max = Math.floor(max)
    //     return Math.floor(Math.random() * (max - min + 1) + min)
    // }


    return (
        <div className="card">
            <img
                src={item.photos[0]}
                alt={`card-img-${item._id}`}
                className='card-img'
            />
            <div className="card-body">
                <div className="card-info">
                    <div>${item.price}<span>{" "}/month</span></div>
                    <div>
                        <p>{item.rating}</p>
                        <GradeIcon className='rating-icon' />
                    </div>
                    <div onClick={() => setLiked(!liked)}>
                        {liked 
                            ? 
                            <FavoriteIcon className='liked-icon'/>
                            : 
                            <FavoriteBorderIcon className='like-icon'/> 
                        }
                    </div>
                </div>
                <div className="card-title">
                    <h4>{item.address.city}{", "}{item.address.state}</h4>
                </div>
                <div className="card-type">
                    {item.type}
                </div>
                <div className="card-address">
                    <h5>{item.address.streetAddress}{", "}{item.address.subdivision}</h5>
                </div>
                <div className="card-text">
                    <div className="beds">
                        <SingleBedIcon className="bed-icon" />
                        <p>{item.bedrooms} Beds</p>
                    </div>
                    <div className="bathrooms">
                        <HotTubIcon className='bathroom-icon' />
                        <p>{item.bathrooms} Bathrooms</p>
                    </div>
                    <div className="area">
                        <RoofingIcon className='area-icon' />
                        <p>{item.livingArea} sqft</p>
                    </div>
                </div>
            </div>
        </div>
    )
}