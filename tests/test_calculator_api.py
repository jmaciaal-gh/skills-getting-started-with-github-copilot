from fastapi.testclient import TestClient

from src.app import app


client = TestClient(app)


def test_calculate_add():
    response = client.post("/calculate", json={"left": 8, "right": 2, "operation": "add"})
    assert response.status_code == 200
    assert response.json() == {"result": 10}


def test_calculate_subtract():
    response = client.post(
        "/calculate", json={"left": 8, "right": 2, "operation": "subtract"}
    )
    assert response.status_code == 200
    assert response.json() == {"result": 6}


def test_calculate_multiply():
    response = client.post(
        "/calculate", json={"left": 8, "right": 2, "operation": "multiply"}
    )
    assert response.status_code == 200
    assert response.json() == {"result": 16}


def test_calculate_divide():
    response = client.post("/calculate", json={"left": 8, "right": 2, "operation": "divide"})
    assert response.status_code == 200
    assert response.json() == {"result": 4}


def test_calculate_divide_by_zero():
    response = client.post("/calculate", json={"left": 8, "right": 0, "operation": "divide"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Cannot divide by zero"


def test_calculate_invalid_operation():
    response = client.post("/calculate", json={"left": 8, "right": 2, "operation": "power"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Unsupported operation"
