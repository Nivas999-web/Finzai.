from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Stock Tracker Backend is running."}

@app.get("/deals")
def get_block_bulk_deals():
    return [
        {"stock": "Reliance", "type": "Block", "buyer": "XYZ Funds", "seller": "ABC Corp", "date": "2025-06-25"},
        {"stock": "TCS", "type": "Bulk", "buyer": "Global Inv", "seller": "Retail Pool", "date": "2025-06-24"}
    ]

@app.get("/stake-changes")
def get_stake_changes():
    return [
        {"stock": "Infosys", "fii": "+1.2%", "dii": "-0.4%", "promoter": "Unchanged"},
        {"stock": "HDFC Bank", "fii": "-0.8%", "dii": "+1.1%", "promoter": "+0.5%"}
    ]

@app.get("/targets")
def get_targets():
    return [
        {"stock": "ITC", "price": "₹520", "source": "Goldman Sachs"},
        {"stock": "LTIMindtree", "price": "₹6700", "source": "JP Morgan"}
    ]

@app.get("/insider")
def get_insider_trades():
    return [
        {"stock": "Infosys", "insider": "CEO", "action": "Buy", "shares": 1500, "date": "2025-06-20"},
        {"stock": "TCS", "insider": "CFO", "action": "Sell", "shares": 500, "date": "2025-06-18"}
    ]

@app.get("/alerts")
def get_alerts():
    return [
        {"type": "Target Update", "stock": "HDFC Bank", "message": "Goldman Sachs revised target to ₹1900"},
        {"type": "Bulk Deal", "stock": "Infosys", "message": "Large bulk deal by Mutual Fund"}
    ]
