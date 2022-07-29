/**
 * Some React...
 * @author <nmarye76@gmail.com> Nathan Marye
 */
import ReactDOM from "react-dom/client"
import React, { useEffect, useState } from "react"
import "./cascade.css"

const _getSomeTableProducts = () => {
    return {
        football: <TableProduct className="product-available" name="Football" price="49.99"/>,
        baseball: <TableProduct className="product-available" name="Baseball" price="9.99"/>,
        basketball: <TableProduct className="product-unavailable" name="Basketball" price="29.99"/>,
        ipod_touch: <TableProduct className="product-available" name="iPod Touch" price="99.99"/>,
        iphone5: <TableProduct className="product-unavailable" name="IPhone 5" price="399.99"/>,
        nexus7: <TableProduct className="product-available" name="Nexus 7" price="199.99"/>,
    }
}

const _getSomeTableCategories = () => {
    return {
        sport: "Sporting goods",
        electronics: "Electronics"
    }
}

// -------------------------------------------------

const TableProduct = ({...props}) => {
    return (
        <tr>
            <td className={props.is_available}>{props.name}</td>
            <td>{props.price.toString().replace(".", ",")}€</td>
        </tr>
    )
}

const _manageUserSearch = (elt, props, tableRows) => {
    if (props.userSearch === "") {
        tableRows.push(
            <TableProduct
                is_available={elt.props.className}
                name={elt.props.name}
                price={elt.props.price}/>
        )
    }
    else {
        if (elt.props.name.includes(props.userSearch)) {
            tableRows.push(
                <TableProduct
                    is_available={elt.props.className}
                    name={elt.props.name}
                    price={elt.props.price}/>
            )
        }
    }
}

const TableCategory = ({...props}) => {
    let tableRows = []
    if (props.isChecked) {
        for (let elt of props.arrayTableProducts) {
            if (elt.props.className === "product-available") {
                _manageUserSearch(elt, props, tableRows)
            }
        }
    }
    else
    {
        for (let elt of props.arrayTableProducts) {
            _manageUserSearch(elt, props, tableRows)
        }
    }
    if (tableRows.length > 0) {
        return (
            <>
                <tr>
                    <th colSpan="2">{props.category}</th>
                </tr>
                {tableRows}
            </>
        )
    }
    else {
        return (<></>)
    }
}

const Table = ({...props}) => {
    let arrayTable = [
        {
            name: _getSomeTableCategories().sport,
            content: [
                _getSomeTableProducts().football,
                _getSomeTableProducts().baseball,
                _getSomeTableProducts().basketball,
            ]
        },
        {
            name: _getSomeTableCategories().electronics,
            content: [
                _getSomeTableProducts().ipod_touch,
                _getSomeTableProducts().iphone5,
                _getSomeTableProducts().nexus7,
            ]
        }
    ]
    
    let tableCategories = []
    for (let elt of arrayTable) {
        tableCategories.push(
            <TableCategory
                category={elt.name}
                arrayTableProducts={elt.content}
                isChecked={props.isChecked}
                setIsChecked={props.setIsChecked}
                userSearch={props.userSearch}
                setUserSearch={props.setUserSearch}/>
        )
    }
    return (
        <div id="the-table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tableCategories}
                </tbody>
            </table>
        </div>
    )
}

const Header = ({...props}) => {
    const handleClickCheckbox = () => {
        props.setIsChecked(!props.isChecked)
    }

    const handleUserTyping = (evt) => {
        props.setUserSearch(evt.target.value)
    }

    return (
        <div id="the-header">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleUserTyping}/>
            <br/>
            <input
                type="checkbox"
                onClick={handleClickCheckbox}/>
            <label>Only show products in stock</label>
        </div>
    )
}

const Board = ({...props}) => {
    const [isChecked, setIsChecked] = useState(false)
    const [userSearch, setUserSearch] = useState("")

    return (
        <div>
            <Header
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                userSearch={userSearch}
                setUserSearch={setUserSearch}/>
            <Table 
                isChecked={isChecked} 
                setIsChecked={setIsChecked}
                userSearch={userSearch}
                setUserSearch={setUserSearch}/>
        </div>
    )
}

const App = () => {
    return <Board/>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
