import './styles.css';
import { useState } from 'react'
import { CustomModal } from '../';
import { Box, Slider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSnackbar } from 'notistack';



export const Filters = ({ data, setEstates }) => {

    const { enqueueSnackbar } = useSnackbar();
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [priceModalOpen, setPriceModalOpen] = useState(false);
    const [propertyTypeModalOpen, setPropertyTypeModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        location: '',
        rating: 0,
        propertyType: '',
        price: {
            start: 0,
            end: 0,
        }
    })

    console.log('filters', filters)


    const handlePriceValue = () => {
        if (filters.price.start === 0 && filters.price.end === 0) {
            return 'Select price';
        }

        if (filters.price.start > 0 && filters.price.end > 0) {
            return `$${filters.price.start} - $${filters.price.end}`;
        }

        if (filters.price.start > 0) {
            return `$${filters.price.start}-nil`;
        }

        if (filters.price.end > 0) {
            return `nil-$${filters.price.end}`;
        }
    }

    const handleFilters = (e) => {
        // console.log(e.target.name, e.target.value)
        const { name, value } = e.target

        // price validation

        setFilters((prevFilters) => {
            
            if(name === 'start' || name === 'end') {
                return {
                    ...prevFilters,
                    price: {
                        ...prevFilters.price,
                        [name]: Number(value),
                    }
                }
            }
            else {
                return {
                    ...prevFilters,
                    [name]: value,
                }
            }

        })
    }

    const handleFilteredSearch = () => {
        let filtered = [...data]


        // price

        // end price

        if(filters.price.end) {
            if(filters.price.end < 500) {
                enqueueSnackbar('end price should be greater than or equal to 500', { variant: 'error' })
                return;
            }
            if(filters.price.start && filters.price.start >= filters.price.end) {
                enqueueSnackbar('end price should be greater than start price', { variant: 'error' })
                return;
            }
        }

        // start price
        if(filters.price.start) {
            if(filters.price.start < 500) {
                enqueueSnackbar('start price should be greater than or equal to 500', { variant: 'error' })
                return;
            }
            if(filters.price.end && filters.price.end <= filters.price.start) {
                enqueueSnackbar('start price should be less than end price', { variant: 'error' })
                return;
            }
        }

        // price

        if(filters.price.start && filters.price.end) {
            filtered = filtered.filter((item) => {
                return item.price >= filters.price.start && item.price <= filters.price.end;
            })
        }
        else if(filters.price.end) {
            filtered = filtered.filter((item) => {
                return item.price <= filters.price.end;
            })
        }
        else if(filters.price.start) {
            filtered = filtered.filter((item) => {
                return item.price >= filters.price.start;
            })
        }

        // location

        if(filters.location.length > 0) {

            filtered = filtered.filter((item) => {
                let address = item.address
                let location = filters.location.toLowerCase()
                let city = address.city.toLowerCase().includes(location)
                let state = address.state.toLowerCase().includes(location)
                let streetAddress = address.streetAddress.toLowerCase().includes(location)
                return city || state || streetAddress;
            })

        }

        // rating

        if(Number(filters.rating) >= 0) {
            filtered = filtered.filter((item) => {
                return item.rating >= Number(filters.rating)
            })
        }

        // property type

        if(filters.propertyType.length > 0) {
            filtered = filtered.filter((item) => {
                return item.type === filters.propertyType
            })
        }


        setEstates(filtered);


    }


    const RatingData = () => {

        return (
            <Box style={{ width: '90%', margin: 'auto'}}>
                <Slider
                    className='slider'
                    aria-label="Rating"
                    name='rating'
                    // defaultValue={0}
                    // getAriaValueText={valuetext}
                    value={filters.rating}
                    onChange={handleFilters}
                    valueLabelDisplay="auto"
                    step={0.5}
                    marks={
                        [
                            {value: 0, label: 0},
                            {value: 5, label: 5},
                            {value: 10, label: 10},
                        ]
                    }
                    min={0}
                    max={10}
                />
            </Box>
        )
    }

    const PriceData = () => {

        return (
            <div className='price-data'>
                <label htmlFor='start'>
                    <input
                        name='start'
                        type='number'
                        onChange={handleFilters}
                        value={filters.price.start}
                        placeholder='start(<= end price)'
                    />
                </label>
                <label htmlFor='end'>
                    <input
                        name='end'
                        type='number'
                        value={filters.price.end}
                        onChange={handleFilters}
                        placeholder='end (>= 500)'
                    />
                </label>
            </div>
        )
    }

    const PropertyTypeData = () => {

        return (
            <div className='property-type-data'>
                <select name='propertyType' value={filters.propertyType} onChange={handleFilters}>
                    <option value='' disabled>Select Property Type</option>
                    <option value='House'>House</option>
                    <option value='Guest House'>Guest House</option>
                    <option value='Apartment'>Apartment</option>
                    <option value='Villa'>Villa</option>
                    <option value='Condo'>Condo</option>
                </select>
            </div>
        )
    }

    return (
        <div className='filters'>
            <div className="location">
                <div className='filter-title'>Location</div>
                <div className='filter-text'>
                    <input
                        type='text'
                        name='location'
                        onChange={handleFilters}
                        value={filters.location}
                        placeholder='Select location'
                    />
                </div>
            </div>
            <div className="rating">
                <div className='filter-title'>Rating</div>
                <div className='filter-text'>
                    <input
                        type='text'
                        value={!filters.rating ? 'Select rating' : filters.rating}
                        placeholder='Select rating'
                        disabled
                    />
                    <div 
                        className='filter-icon'
                        onClick={() => setRatingModalOpen(true)}
                    >
                        <KeyboardArrowDownIcon className='filter-down' />
                    </div>
                    <CustomModal
                        open={ratingModalOpen}
                        handleClose={setRatingModalOpen}
                        data={RatingData}
                        title={'Rating'}
                    />
                </div>
            </div>
            <div className="price">
                <div className='filter-title'>Price</div>
                <div className='filter-text'>
                    <input
                        type='text'
                        value={handlePriceValue()}
                        placeholder='Select price'
                        disabled
                    />
                    <div 
                        className='filter-icon'
                        onClick={() => setPriceModalOpen(true)}
                    >
                        <KeyboardArrowDownIcon className='filter-down' />
                    </div>
                    <CustomModal
                        open={priceModalOpen}
                        handleClose={setPriceModalOpen}
                        data={PriceData}
                        title={'Price'}
                    />
                </div>
            </div>
            <div className="property-type">
                <div className='filter-title'>Property Type</div>
                <div className='filter-text'>
                    <input
                        type='text'
                        value={filters.propertyType}
                        placeholder='Select property type'
                        disabled
                    />
                    <div 
                        className='filter-icon'
                        onClick={() => setPropertyTypeModalOpen(true)}
                    >
                        <KeyboardArrowDownIcon className='filter-down' />
                    </div>
                    <CustomModal
                        open={propertyTypeModalOpen}
                        handleClose={setPropertyTypeModalOpen}
                        data={PropertyTypeData}
                        title={'Property Type'}
                    />
                </div>
            </div>
            <div className="search-btn">
                <button
                    onClick={handleFilteredSearch}
                >
                    Search
                </button>
            </div>
            
        </div>
    )
}