# Multi Elements Demo

_Learn how to use the card element alongside the payment element._

## Requirements

- Python 3
- Configured .env file

## Installation

Clone this repository:

```sh
git clone git@github.com:ejanicas-stripe/multi-elements.git
```

1. Confirm `.env` configuration

Ensure the API keys are configured in `.env` in this directory. It should include the following keys:

```yaml
# Stripe API keys - see https://stripe.com/docs/development/quickstart#api-keys
STRIPE_PUBLISHABLE_KEY=pk_test...
STRIPE_SECRET_KEY=sk_test...

# Path to front-end implementation
STATIC_DIR=../client
DOMAIN=http://localhost:4242
```

Copy the `.env` file to the server directory:

```
cp .env.example server/.env
```

2. Create and activate a new virtual environment for the server

**MacOS / Unix**

```
cd server
python3 -m venv env
source env/bin/activate
```

**Windows (PowerShell)**

```
cd server
python3 -m venv env
.\env\Scripts\activate.bat
```

3. Install dependencies

```
pip install -r requirements.txt
```

4. Export and run the application

**MacOS / Unix**

```
export FLASK_APP=server.py
python3 -m flask run --port=4242
```

**Windows (PowerShell)**

```
$env:FLASK_APP=“server.py"
python3 -m flask run --port=4242
```

5. Open a new terminal tab on the client folder and launch an http server:

```
python -m http.server
```

6. Go to `localhost:8000` in your browser to see the demo

---
## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Stripe calls and
concepts you need to understand. These demos are meant as an educational tool
that helps you roadmap how to integrate Stripe within your own system
independent of the framework.

## Help

Any advise for common problems or issues contact me on ejanicas@stripe.com.

## Authors

Eduardo Janicas (ejanicas@stripe.com)

## Version History

- 0.1
  - Initial Release

## License

MIT License

Copyright (c) 2021 Stripe, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.