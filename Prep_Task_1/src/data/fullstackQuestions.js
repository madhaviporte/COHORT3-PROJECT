export const fullstackQuestions = [
  {
    id: 1,
    question: 'What is the difference between controlled and uncontrolled components in React?',
    answer: `Controlled components:
The component's form input value is driven by React state. Every keystroke updates state, and the input always reflects what React holds.

  const [name, setName] = useState('');
  <input value={name} onChange={e => setName(e.target.value)} />

Uncontrolled components:
The DOM manages the input value itself. You read the value using a ref when you need it (e.g., on form submit).

  const inputRef = useRef();
  <input ref={inputRef} />
  // Read: inputRef.current.value

When to use which:
- Controlled: validation as the user types, conditional rendering based on input, most real-world forms.
- Uncontrolled: file inputs (which are always uncontrolled), integrating with non-React libraries, or when you only need the value on submit.`,
  },
  {
    id: 2,
    question: 'How does the useEffect hook work and when should you use the cleanup function?',
    answer: `useEffect runs a side effect after the component renders. The second argument (dependency array) controls when it re-runs.

  useEffect(() => {
    // Runs after every render (no dependency array)
  });

  useEffect(() => {
    // Runs only once, after first render
  }, []);

  useEffect(() => {
    // Runs whenever 'value' changes
  }, [value]);

Cleanup function:
Return a function from useEffect. React calls it before the next effect runs and when the component unmounts.

  useEffect(() => {
    const timer = setInterval(() => console.log('tick'), 1000);
    return () => clearInterval(timer); // cleanup: stops the timer
  }, []);

Use cleanup when:
- Setting up subscriptions or event listeners
- Starting timers or intervals
- Making fetch requests (to cancel if the component unmounts)
- Opening WebSocket connections`,
  },
  {
    id: 3,
    question: 'What is a REST API and how does it communicate with a React frontend?',
    answer: `REST (Representational State Transfer) is a set of conventions for building APIs over HTTP. A REST API exposes resources (users, products, posts) as URLs and uses HTTP methods to perform actions.

Common HTTP methods:
- GET    /api/posts        — fetch all posts
- GET    /api/posts/1      — fetch a single post
- POST   /api/posts        — create a new post
- PUT    /api/posts/1      — update a post (full replacement)
- PATCH  /api/posts/1      — update part of a post
- DELETE /api/posts/1      — delete a post

How React communicates with a REST API:
Use fetch() or a library like axios inside useEffect (or a custom hook) to make HTTP requests.

  useEffect(() => {
    fetch('https://api.example.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

For POST requests, include the data in the request body:
  fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Hello' }),
  });`,
  },
  {
    id: 4,
    question: 'What is the difference between SQL and NoSQL databases?',
    answer: `SQL (Relational) databases:
- Store data in structured tables with rows and columns.
- Use a fixed schema — every record must match the table's column definitions.
- Relationships between tables are defined using foreign keys and joins.
- Examples: PostgreSQL, MySQL, SQLite.
- Best for: structured, consistent data with complex relationships (banking, e-commerce orders).

  SELECT users.name, orders.total
  FROM users
  JOIN orders ON users.id = orders.user_id;

NoSQL databases:
- Store data in flexible formats: documents (JSON), key-value pairs, graphs, or columns.
- Schema-less — each document can have different fields.
- Horizontally scalable (easy to distribute across many servers).
- Examples: MongoDB (documents), Redis (key-value), Cassandra (columns).
- Best for: rapidly changing data structures, large scale, content management, real-time apps.

  // MongoDB document
  { _id: "abc", name: "Alice", tags: ["admin", "user"] }

How to choose:
- Need complex joins and ACID transactions → SQL.
- Need flexible schema, fast reads at scale → NoSQL.`,
  },
  {
    id: 5,
    question: 'What is CORS and how do you fix a CORS error?',
    answer: `CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks web pages from making requests to a different domain, port, or protocol than the page was loaded from.

Example of a CORS error:
Your React app runs at http://localhost:3000.
It tries to call an API at http://localhost:5000.
The browser blocks the request because the origins are different.

Why it exists:
To protect users from malicious scripts on one site making unauthorized requests to another site on their behalf.

How to fix it (on the server):
Add the appropriate CORS headers to your API responses.

In Node.js / Express:
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:3000' }));

The server responds with:
  Access-Control-Allow-Origin: http://localhost:3000

In development (Vite):
Use the Vite proxy config in vite.config.js to avoid CORS altogether:
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  }

Note: CORS is enforced by the browser only. Server-to-server requests are not affected.`,
  },
];
