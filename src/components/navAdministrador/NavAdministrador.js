import React from 'react'

function NavAdministrador() {
    return(
        <>
            <ul className="nav nav-pills justify-content-center">
                <li className="nav-container-item">
                    <a className="nav-link" href="#">Active</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="true">Drop</a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
                </ul>
        </>
    );
}

export default NavAdministrador;