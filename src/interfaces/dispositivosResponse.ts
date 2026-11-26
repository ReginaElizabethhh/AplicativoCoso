export interface Welcome {
    obtenerTotalDispositivo:          number;
    listarDispositivosActivos:        ListarDispositivosActivo[];
    contarDispositivosTipo:           ContarDispositivosTipo[];
    tresPrimerosDispositivos:         DispositivosInstaladosElMismoDia[];
    dispositivosInstaladosElMismoDia: DispositivosInstaladosElMismoDia[];
    dispositivosModeloDHT22:          DispositivosInstaladosElMismoDia[];
    tiposPorDispositivo:              ContarDispositivosTipo[];
}

export interface ContarDispositivosTipo {
    tipo:  Tipo;
    total: number;
}

export type Tipo = "nivel" | "ambiente" | "temperatura";

export interface DispositivosInstaladosElMismoDia {
    id:                number;
    nombre:            string;
    modelo:            Modelo;
    ubicacion:         Ubicacion;
    tipo:              Tipo;
    activo:            number;
    fecha_instalacion: Date;
}

export type Modelo = "JSN-SR04T" | "DHT22" | "HC-SR04 + DS18B20" | "DS18B20";

export type Ubicacion = "Azotea edificio B" | "Área de germinación" | "Azotea edificio A" | "Cámara fría" | "Zona de cultivo" | "Bodega general" | "Patio central";

export interface ListarDispositivosActivo {
    nombre:    string;
    ubicacion: Ubicacion;
}
