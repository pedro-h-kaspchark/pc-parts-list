export class Part {
    private _type: number;
    private _brand: string;
    private _model: string;
    private _definitions!: string;
    private _power!: number;
    private _id!: string;
    private _downloadURL: any;
    private _uid!: string;

    constructor(type : number, brand : string, model : string){
        this._type = type;
        this._brand = brand;
        this._model = model;
    }

    public get type(): number {
        return this._type;
    }
    public set type(type: number) {
        this._type = type;
    }

    public get brand(): string {
        return this._brand;
    }
    public set brand(brand: string) {
        this._brand = brand;
    }

    public get model(): string {
        return this._model;
    }
    public set model(model: string) {
        this._model = model;
    }

    public get definitions(): string {
        return this._definitions;
    }
    public set definitions(definitions: string) {
        this._definitions = definitions;
    }

    public get power(): number {
        return this._power;
    }
    public set power(power: number) {
        this._power = power;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get downloadURL(): any {
        return this._downloadURL;
    }
    public set downloadURL(value: any) {
        this._downloadURL = value;
    }

    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }
}
