# Timberborn Signals Display

A simple dashboard to visualize **automation signals from Timberborn**.

It connects to the automation adapter API and displays:

- **Graphs** for threshold-based signals (example: `POP > 50`)
- **Signal cards** for on/off signals
- **Weather state** (Sunny / Drought / Badtide)

The goal is to give players a **clear overview of their automation state in real time**.

---

# Quick Start (Non-technical guide)

This section explains **step by step how to run the viewer** even if you are not a developer.

You only need to install **Node.js** and run a few commands.

---

### 1. Install Node.js (includes npm)

The project uses **npm** to install its dependencies.

Download Node.js here:

https://nodejs.org/

Download the **LTS version**.

After installation you should have two commands available:

```
node
npm
```

To verify installation, open a terminal and run:

```
node --version
npm --version
```

If both show a version number, you're good to go.

---

### 2. Download the project

There are **two ways** to download the project.

---

## Option A — Download without Git (simplest)

1. Open the repository:

https://github.com/EtienneDx/timberborn-signals-displays

2. Click the green **Code** button.

3. Click **Download ZIP**.

4. Extract the ZIP somewhere on your computer.

Example:

```
Documents/
  timberborn-signals-displays/
```

---

## Option B — Download using Git

If you have Git installed, you can clone the repository.

Install Git:

https://git-scm.com/downloads

Then run:

```
git clone https://github.com/EtienneDx/timberborn-signals-displays.git
```

This will create a folder:

```
timberborn-signals-displays
```

---

### 3. Open a terminal in the project folder

You now need to open a **terminal inside the project folder**.

### Windows

1. Open the project folder in Explorer  
2. Click the address bar  
3. Type:

```
cmd
```

4. Press Enter

This opens a command prompt in the folder.

---

### MacOS / Linux

Open a terminal and navigate into the folder:

```
cd timberborn-signals-displays
```

---

### 4. Install dependencies (clean install)

Run:

```
npm install
```

This downloads all required libraries.

This only needs to be done **once** (or when dependencies change).

---

### 5. Start the viewer

Run:

```
npm run dev
```

You should see something like:

```
Local: http://localhost:5173
```

Open that address in your browser.

The dashboard should appear and start polling your automation signals.

---

## How the viewer reads signals

The viewer automatically detects two types of signals.

---

### Graph signals

Signals matching this pattern:

```
NAME > VALUE
```

Example:

```
POP > 50
POP > 60
POP > 70
```

The graph displays the **highest active threshold**.

Example:

| Signal | State |
|------|------|
POP > 50 | ON |
POP > 60 | ON |
POP > 70 | OFF |

Displayed value:

```
60
```

---

### Percentage graphs

You can also use percentage thresholds:

```
STORAGE > 20%
STORAGE > 40%
STORAGE > 60%
```

These will display **percentage axes automatically**.

---

### Weather signals

Two special signals are used for weather display:

```
WEATHER DROUGHT
WEATHER BADTIDE
```

Weather is determined as follows:

| Drought | Badtide | Weather |
|------|------|------|
false | false | Sunny |
true | false | Drought |
false | true | Badtide |
true | true | ERROR |

If either signal is missing, the dashboard will show:

```
No weather info available
```

---

## Reporting bugs or requesting features

If you encounter an issue or want a new feature, please create a GitHub issue.

Open the Issues page:

https://github.com/EtienneDx/timberborn-signals-displays/issues

Click:

```
New Issue
```

When reporting a bug, please include:

- What happened
- What you expected
- Screenshots (if possible)
- Browser used
- Steps to reproduce the problem

Example bug report:

```
Title:
Graph does not update after reconnect

Description:
After restarting the automation server the graph stops updating.

Steps to reproduce:
1. Start dashboard
2. Restart automation server
3. Graph stays frozen
```

Feature requests are also welcome!

Example:

```
Title:
Add dark mode

Description:
A dark theme would make the dashboard easier to read at night.
```

---

## Technical Overview

This section describes the **technical architecture** of the project.

---

### Framework

The application uses:

**React + TypeScript**

React provides the UI component structure and TypeScript adds type safety.

---

### Build Tool

The project uses:

**Vite**

Benefits:

- very fast dev server
- instant hot reload
- simple configuration

---

### Graph Library

Graphs are rendered using:

**Recharts**

https://recharts.org

Advantages:

- React-native chart components
- responsive charts
- lightweight compared to Chart.js

---

### Tooltips

Tooltips use:

**Tippy.js**

https://atomiks.github.io/tippyjs/

Benefits:

- modern styling
- lightweight
- easy integration with React

---

### Icons

Icons come from:

**React Icons**

https://react-icons.github.io/react-icons/

This allows easy use of icons from multiple libraries.

---

### Data Flow

Every **5 seconds** the dashboard fetches:

```
/api/adapters
```

Example response:

```
[
  { "name": "POP > 65", "state": false },
  { "name": "POP > 60", "state": true }
]
```

The viewer then:

1. Groups signals into graphs
2. Finds the **highest active threshold**
3. Adds a new sample to the graph
4. Keeps the **last hour of history (720 samples)**

---

### Layout

The UI is organized into:

```
Header
Graphs
Signals
```

Graphs are responsive and signals use a **column layout** for readability.

---

## Contributing

Contributions are welcome!

If you'd like to contribute:

1. Fork the repository
2. Create a branch
3. Submit a pull request

---

## License

MIT License.