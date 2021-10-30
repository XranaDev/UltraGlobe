import * as THREE from 'three';
const VISIBILITY_CHANGE = "visibility-change";
class Layer {
    /**
     * 
     * @param {id: Object, 
     * name: String, 
     * bounds: [Double]} properties 
     */
    constructor(properties) {
        this.id = properties.id;
        this.name = properties.name;
        this.bounds = new THREE.Box2(new THREE.Vector2(properties.bounds[0], properties.bounds[1]), new THREE.Vector2(properties.bounds[2], properties.bounds[3]));
        this.visible = properties.visible;
        this.listeners = [];
    }

    getID() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
    setVisible(visible) {
        this.visible = visible;
        this.listeners.forEach(element => {
            element(this, VISIBILITY_CHANGE);
        });
    }


    getBounds() {
        return this.bounds;
    }
    _setBounds(bounds) {
        this.bounds = this.bounds;

    }

    addListener(listener) {
        this.listeners.push(listener);
    }
}

export { Layer, VISIBILITY_CHANGE };