Moralis.initialize("u5ZrcfxHZK2QqlZtyrJIz1mpxMSy8FxLNl4ibKyk"); // Application id from moralis.io
Moralis.serverURL = "https://jt9wl7xobhx6.moralishost.com:2053/server"; //Server url from moralis.io

let currentUser;

async function init() {
    currentUser = Moralis.User.current();
    if (currentUser) {
        document.getElementById("login_button").style.display = 'none';
        const options = { address: "0xfadc18227a9b5cbc17ac7b2b23f9ed8394ed7a00", chain: "ropsten" };
        const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
        console.log(NFTs)
        renderNftToken(NFTs.result)
    }
}

function renderNftToken(NFTs) {
    const parent = document.getElementById('app');
    let htmlString = '';
    NFTs.forEach(element => {
        console.log(JSON.parse(element.metadata))
        const metadata = JSON.parse(element.metadata)
        htmlString += `
        <div class="col-sm">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${metadata.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${metadata.name}</h5>
                    <p class="card-text">${metadata.description}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
        `;
    });
    parent.innerHTML = htmlString
}

async function login() {
    try {
        if (!currentUser) {
            currentUser = await Moralis.Web3.authenticate();
            init()
        }
    } catch (error) {
        console.log(error);
    }
}

init()
document.getElementById("login_button").onclick = login;