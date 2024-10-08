import React, { useState, useEffect } from 'react';
import SearchButton from './SearchButton';
import SortButton from './SortButton';
import Loading from './Loading';

const CryptoTable = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {

        setTimeout(()=>{
            const fetchData = async () => {
                try {
                    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
                    const result = await response.json();
                    setData(result);
                    setFilteredData(result);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        },2000);
      

        
    }, []);

    const searchData = () => {
        const filtered = data.filter(coin => 
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const sortData = (key) => {
        const sorted = [...filteredData].sort((a, b) => {
            if (key === 'market_cap') {
                return b.market_cap - a.market_cap;
            } else if (key === 'percentage_change') {
                return b.price_change_percentage_24h - a.price_change_percentage_24h;
            }
            return 0;
        });
        setFilteredData(sorted);
    };

    return (
        <div>
            <div>
            <h1>Crypto DataTable</h1>
            <input 
                type="text" 
                placeholder="Search by name or symbol" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <SearchButton onClick={searchData} />
            <SortButton onClick={() => sortData('market_cap')} label="Sort by Market Cap" />
            <SortButton onClick={() => sortData('percentage_change')} label="Sort by Percentage Change" />
            </div>


            <table style={{backgroundColor:"black" ,color:"white"}}>
                <thead>
                    <tr style={{display:"flex",justifyContent:"space-evenly",width:"90vh"}}>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Current Price</th>
                        <th>Total Volume</th>
                      
                    </tr>
                    <br/>
                </thead>
                <tbody>
                    {filteredData.length >0 ? (filteredData.map(coin => (

                        <div>
                        <tr key={coin.id} style={{display:"flex",justifyContent:"space-evenly",width:"90vh"}}>
                            <td><img src={coin.image} alt={coin.name} width="30" /></td>
                            <td>{coin.name}</td>
                            <td>{coin.symbol.toUpperCase()}</td>
                            <td>${coin.current_price.toLocaleString()}</td>
                            <td>{coin.total_volume.toLocaleString()}</td>
                        
                        </tr>
                        <hr style={{background: 'lime',color: 'lime',borderColor: 'lime',height: '1px',}} />
                        </div>
                        
                        ))):(<Loading />)}

                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;


