var mainTab = document.getElementById("mainTab");
var upgradeTab = document.getElementById("upgradeTab");
var casinoTab = document.getElementById("casinoTab");
var mainBtn = document.getElementById("mainBtn");
var upgradeBtn = document.getElementById("upgradeBtn");
var casinoBtn = document.getElementById("casinoBtn");
var activeTab = "M";

var money = 0;
var moneyBoost = 1;
var moneyAmount = document.getElementById("moneyAmount");

var statusMessage = document.getElementById("statusMessage");
var messageBox = document.getElementById("messageBox");
var itemMessage = document.getElementById("itemMessage");
var itemIsSold = [];
var currentItem = 0;

var ibBtn = document.getElementById("ibBtn");
var bcBtn = document.getElementById("bcBtn");
var incomeBoost = 1;
var bonusClick = 0;
var currentIB = 0;
var currentBC = 0;

var bcAmountTxt = document.getElementById("bcAmount");
var bcRateTxt = document.getElementById("bcRate");
var bcAmount = 0;

var moneyWrap = document.getElementById("moneyWrap");

var moneyVal = document.getElementById("moneyVal");

var UI = document.getElementById("UI");
var incomeAmount = document.getElementById("incomeAmount");

for(var i = 0; i < ITEMS.length; i++){
    itemIsSold.push(false);
}

function moneyEffect(text){
    text = Math.round(text);
    if(text > 0){
        text = "+$" + text;
    }else{
        text = "-$" + text;
    }
    const effectDiv = document.createElement("div");
    effectDiv.innerHTML = text;
    effectDiv.classList.add("moneyEffect");
    moneyWrap.appendChild(effectDiv);

    effectDiv.addEventListener("animationend", ()=>{
        moneyWrap.removeChild(effectDiv);
    });
}

function changeActiveTab(){
    UI.classList = "UI";
    if(activeTab == "M"){
        UI.classList.add("UIM");
        mainTab.style.visibility = "visible";
        upgradeTab.style.visibility = "hidden";
        casinoTab.style.visibility = "hidden";
    }else if(activeTab == "U"){
        UI.classList.add("UIU");
        mainTab.style.visibility = "hidden";
        upgradeTab.style.visibility = "visible";
        casinoTab.style.visibility = "hidden";
    }else if(activeTab == "C"){
        UI.classList.add("UIC");
        mainTab.style.visibility = "hidden";
        upgradeTab.style.visibility = "hidden";
        casinoTab.style.visibility = "visible";
    }
}

mainBtn.addEventListener("click", ()=>{
    activeTab = "M";
    changeActiveTab();
});
upgradeBtn.addEventListener("click", ()=>{
    activeTab = "U";
    changeActiveTab();
});
casinoBtn.addEventListener("click", ()=>{
    activeTab = "C";
    changeActiveTab();
});

changeActiveTab();

function updateMoney(){
    money = Math.round(money);
    moneyAmount.innerHTML = "$" + money;
    moneyVal.innerHTML = money;
}

function updateStatus(){
    for(var i = 1; i < MESSAGE.length; i++){
        if(money < MESSAGE[i].money){
            statusMessage.innerHTML = MESSAGE[i-1].text;
            return;
        }
    }
    statusMessage.innerHTML = MESSAGE[MESSAGE.length - 1].text;
}

function updateItemMsg(){
    for(var i = 0; i < ITEMS.length; i++){
        if(itemIsSold[i] == false && money >= ITEMS[i].money){
            itemMessage.innerHTML = ITEMS[i].msg;
            currentItem = i;
            messageBox.style.visibility = "inherit";
            messageBox.style.height = "fit-content";
            return;
        }
    }
}

function buyCurrentItem(){
    money = money - ITEMS[currentItem].cost;
    moneyEffect(ITEMS[currentItem].cost);

    messageBox.style.visibility = "hidden";
    messageBox.style.height = "0";
    itemIsSold[currentItem] = true;
    moneyBoost = moneyBoost + ITEMS[currentItem].boost;
    updateMoney();
    updateIncome();
    
}

function updateUpgrade(){
    if(money >= IB[currentIB]){
        ibBtn.innerHTML = IB[currentIB];
    }else{
        ibBtn.innerHTML = "CANNOT AFFORD";
    }
    if(money >= BC[currentBC]){
        bcBtn.innerHTML = BC[currentBC];
    }else{
        bcBtn.innerHTML = "CANNOT AFFORD";
    }
}

function incomeBoostBuy(){
    if(money >= IB[currentIB]){
        money -= IB[currentIB];
        incomeBoost = incomeBoost * 1.1;
        currentIB++;
        updateMoney();
        updateUpgrade();
        updateIncome();
    }
}
function updateBonusClick(){
    bcAmountTxt.innerHTML = Math.round(bcAmount * 10) / 10 + " Bonus Clicks";
    bcRateTxt.innerHTML = "+" + bonusClick + " per click";
    
}

function bonusClickBuy(){
    if(money >= BC[currentBC]){
        money -= BC[currentBC];
        bonusClick += 0.1;
        currentBC++;
        updateMoney();
        updateBonusClick();
        updateUpgrade();
    }
}

function bonusClickEarn(){
    money += moneyBoost * incomeBoost * bcAmount;
    moneyEffect(moneyBoost * incomeBoost * bcAmount);
    bcAmount = 0;
    updateMoney();
    updateStatus();
    updateItemMsg();
    updateUpgrade();
    updateBonusClick();
    
}

function updateIncome(){
    var income = moneyBoost * incomeBoost;
    income = Math.round(income);
    incomeAmount.innerHTML = "$" + income;
}

function earnMoney(){
    money = money + moneyBoost * incomeBoost;
    bcAmount += bonusClick;
    updateMoney();
    updateStatus();
    updateItemMsg();
    updateUpgrade();
    updateBonusClick();
    moneyEffect(moneyBoost * incomeBoost);
}