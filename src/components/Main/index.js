import './styles.css';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Filters, Card } from '../';
import { data } from '../../data/';


export const Main = () => {

    // console.log(data)
    const [estates, setEstates] = useState(data)

    console.log("estates", estates.length)

    return (
        <div className='main-container'>
            <div className="main-content">
                <div className="main-header">
                    <h1>Search properties to rent</h1>
                    <div className="search-button">
                        <OutlinedInput
                            type="search"
                            placeholder='Search with Search Bar'
                            className='search-field'
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            }
                        />
                    </div>
                </div>
                <div className="filter-container">
                    <Filters data={data} setEstates={setEstates} />
                </div>
                <div className="card-container">
                    {estates.length > 0 ? (
                        [...estates].map(item => <Card key={item._id} item={item} />)
                    ) : (
                        <div className="empty-container">
                            <h1>No property found!</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}