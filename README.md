# Renderer pattern problem demo

React Virtualized uses an interesting pattern. Some of their components take a "renderer" function, which is then called to update children as needed. 

https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

// List data as an array of strings
const list = [
  'Brian Vaughn'
  // And so on...
];

function rowRenderer ({ key, index, style}) {
  return (
    <div
      key={key}
      style={style}
    >
      {list[index]}
    </div>
  )
}

// Render your list
ReactDOM.render(
  <AutoSizer>
    {({ height, width }) => (
      <List
        height={height}
        rowCount={list.length}
        rowHeight={20}
        rowRenderer={rowRenderer}
        width={width}
      />
    )}
  </AutoSizer>,
  document.getElementById('example')
);

```

There's a nasty gotcha there. If your renderer function is placed outside of the render() chain and its closures, state changes will no longer trigger.

This app demonstrates the problem.

### Installation

It's create react app, so `npm install`, then `npm start`.

### License

None