function Header() {
    return(
        <header>
            <div>
                <img id="icon" src={require('../../images/taskIcon.png')} />
            </div>
            <div id="title">
                <h2>Todo List</h2>
            </div>
        </header>
    );
}

export default Header;