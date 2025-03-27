import React, { useState, useEffect } from 'react';

const YapilacaklarListesi = () => {
    const [gorev, setGorev] = useState('');
    const [gorevler, setGorevler] = useState([]);
    const [tamamlananGorevler, setTamamlananGorevler] = useState([]);

    useEffect(() => {
        const storedGorevler = JSON.parse(localStorage.getItem('gorevler'));
        const storedTamamlananGorevler = JSON.parse(localStorage.getItem('tamamlananGorevler'));

        if (storedGorevler) {
            setGorevler(storedGorevler);
        }
        if (storedTamamlananGorevler) {
            setTamamlananGorevler(storedTamamlananGorevler);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('gorevler', JSON.stringify(gorevler));
        localStorage.setItem('tamamlananGorevler', JSON.stringify(tamamlananGorevler));
    }, [gorevler, tamamlananGorevler]);

    const girisDegisti = (event) => {
        setGorev(event.target.value);
    };

    const gorevEkle = () => {
        if (gorev.trim() !== '') {
            setGorevler([...gorevler, { id: Date.now(), isim: gorev }]);
            setGorev('');
        }
    };

    const tamamlandi = (id) => {
        const tamamlanan = gorevler.find(g => g.id === id);
        if (tamamlanan) {
            setTamamlananGorevler([...tamamlananGorevler, tamamlanan]);
            setGorevler(gorevler.filter(g => g.id !== id));
        }
    };

    const gorevSil = (id) => {
        setGorevler(gorevler.filter(g => g.id !== id));
        setTamamlananGorevler(tamamlananGorevler.filter(g => g.id !== id));
    };

    return (
        <div>
            <h2>Yapılacaklar Listesi</h2>
            <div>
                <input type="text" value={gorev} onChange={girisDegisti} />
                <button onClick={gorevEkle}>Ekle</button>
            </div>
            <div>
                <h3>Aktif Görevler</h3>
                <ul>
                    {gorevler.map(g => (
                        <li key={g.id}>
                            {g.isim}
                            <button onClick={() => tamamlandi(g.id)}>Tamamlandı</button>
                            <button onClick={() => gorevSil(g.id)}>Sil</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Tamamlanan Görevler</h3>
                <ul>
                    {tamamlananGorevler.map(g => (
                        <li key={g.id}>
                            <del>{g.isim}</del>
                            <button onClick={() => gorevSil(g.id)}>Sil</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default YapilacaklarListesi;
