# Calculator API

A super simple FastAPI application with a web UI that simulates a calculator.

## Features

- Perform add, subtract, multiply, and divide operations
- Handle division-by-zero and invalid-operation errors

## Getting Started

1. Install the dependencies:

   ```
   pip install fastapi uvicorn
   ```

2. Run the application:

   ```
   python app.py
   ```

3. Open your browser and go to:
   - API documentation: http://localhost:8000/docs
   - Alternative documentation: http://localhost:8000/redoc

## API Endpoints

| Method | Endpoint     | Description                                      |
| ------ | ------------ | ------------------------------------------------ |
| POST   | `/calculate` | Execute a calculation based on input operands and operation |

## Data Model

The `/calculate` endpoint expects:

- `left`: number
- `right`: number
- `operation`: one of `add`, `subtract`, `multiply`, `divide`
