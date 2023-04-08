import { useEffect, useState } from 'react';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import BookList from './components/BookList';
import axios from 'axios';

function App() {
    const [selectedBookId, setSelectedBookId] = useState();

    return (
        <div className="App">
            <center className="pb-5 font-bold text-3xl p-5">Reading list</center>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-5">
                <div>
                    <BookList
                        selectedBookId={selectedBookId}
                        setSelectedBookId={setSelectedBookId}
                    />
                </div>
                <div>
                    <AddBook />
                </div>
                <div>
                    <BookDetails id={selectedBookId} />
                </div>
            </div>
        </div>
    );
}

export default App;
