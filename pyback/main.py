from flask import Flask
from flask_cors import CORS
import requests
from flask_cors import cross_origin
from pprint import pprint


app = Flask(__name__)
CORS(app)


@app.route("/<path:lat>/<path:lng>/<int:r>")
@cross_origin()
def hello_world(lat, lng, r):
    try:
        lat = float(lat)
        lng = float(lng)
    except ValueError:
        return {"error": "Invalid coordinates"}, 400
    print(-(r - 18000))
    resp = requests.get(
        f"https://platform.tier-services.io/v1/vehicle?lat={round(lat, 1)}&lng={round(lng, 1)}&radius={-(r-18000)}",
        headers={"X-Api-Key": "bpEUTJEBTf74oGRWxaIcW7aeZMzDDODe1yBoSxi2"},
        verify=False,
    )
    res = {
        "data": [
            [
                i["attributes"]["lat"],
                i["attributes"]["lng"],
                i["attributes"]["licencePlate"],
                i["attributes"]["batteryLevel"],
            ]
            for i in resp.json()["data"]
        ]
    }
    return (
        res if res["data"] else {"error": "No vehicles found"},
        200 if res["data"] else 404,
    )


if __name__ == "__main__":
    app.run()
