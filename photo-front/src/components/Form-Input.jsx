import { useState } from 'react';

function Form() {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImages([...selectedImages, file]);
        }
    };

    return(
        <form className="input-form">
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {/* <h3>Imágenes seleccionadas:</h3>
            <ul>
            {selectedImages.map((image, i) => (
                <li key={i.id}>{image.name}</li>
            ))}
            </ul> */}
        </form>
        );
}

export default Form