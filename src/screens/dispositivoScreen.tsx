
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useDataResponse } from "../hooks/useDispositivoResponse";
import { BarChart } from "react-native-gifted-charts";

// Colores de taller / técnico
const C = {
  fondo: "#FFF0F6",
  tarjeta: "#FFFFFF",
  borde: "#F5B8D0",
  texto: "#713B56",
  suave: "#A87991",
  azul: "#F28DB8",
  verde: "#D66A9B",
  naranja: "#F6A6C8",
  morado: "#C49AD8",
  rojo: "#D96B8C",
  amarillo: "#F7C9DA",
  grisClaro: "#EAD2DE",
};

const Tarjeta = ({
  titulo,
  icono,
  children,
}: {
  titulo: string;
  icono?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.tarjeta}>
    <View style={styles.tarjetaHeader}>
      {icono && <Text style={styles.icono}>{icono}</Text>}
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
    {children}
  </View>
);

const DispositivoCard = ({
  nombre,
  modelo,
  ubicacion,
  tipo,
  fecha,
  activo,
}: {
  nombre: string;
  modelo: string;
  ubicacion: string;
  tipo: string;
  fecha?: string | Date;
  activo?: number;
}) => (
  <View style={styles.dispositivo}>
    <View style={styles.dispositivoHeader}>
      <Text style={styles.nombre}>{nombre}</Text>
      {activo !== undefined && (
        <View
          style={[
            styles.badge,
            { backgroundColor: activo ? "#FCE1EC" : "#F8DCE3" },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: activo ? C.verde : C.rojo },
            ]}
          >
            {activo ? "ACTIVO" : "INACTIVO"}
          </Text>
        </View>
      )}
    </View>

    <View style={styles.detalleRow}>
      <Text style={styles.detalleLabel}>Modelo</Text>
      <Text style={styles.detalleValue}>{modelo}</Text>
    </View>

    <View style={styles.detalleRow}>
      <Text style={styles.detalleLabel}>Ubicación</Text>
      <Text style={styles.detalleValue}>{ubicacion}</Text>
    </View>

    <View style={styles.detalleRow}>
      <Text style={styles.detalleLabel}>Tipo</Text>
      <Text style={styles.detalleValue}>{tipo}</Text>
    </View>

    {fecha && (
      <View style={styles.detalleRow}>
        <Text style={styles.detalleLabel}>Instalación</Text>
        <Text style={styles.detalleValue}>
          {new Date(fecha).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
    )}
  </View>
);

export const DispositivoScreen = () => {
  const { isLoading, data, loadData } = useDataResponse();
  const { width } = useWindowDimensions();
  const chartWidth = width - 72;

  if (isLoading && !data) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={C.azul} />
        <Text style={styles.loadingText}>
          Cargando inventario de dispositivos...
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centro}>
        <Text style={styles.errorText}>
          No se pudo obtener la información.
        </Text>
        <Text style={styles.errorSub}>
          Desliza hacia abajo para reintentar
        </Text>
      </View>
    );
  }

  // Datos para gráficas
  const tipos = data.contarDispositivosTipo.map((d, i) => ({
    value: Number(d.total),
    label: d.tipo,
    labelWidth: 90,
    frontColor: [C.azul, C.verde, C.naranja, C.morado][i % 4],
    topLabelComponent: () => (
      <View style={styles.etiquetaGrafica}>
        <Text style={styles.barLabel}>{d.total}</Text>
      </View>
    ),
  }));

  const tiposRepetidos = data.tiposPorDispositivo.map((d, i) => ({
    value: Number(d.total),
    label: d.tipo,
    labelWidth: 90,
    frontColor: [C.morado, C.azul, C.naranja][i % 3],
    topLabelComponent: () => (
      <View style={styles.etiquetaGrafica}>
        <Text style={styles.barLabel}>{d.total}</Text>
      </View>
    ),
  }));

  // Espacio reservado arriba para las etiquetas
  const maxTipos = Math.max(...tipos.map((d) => d.value), 1) * 1.35;
  const maxTiposRepetidos =
    Math.max(...tiposRepetidos.map((d) => d.value), 1) * 1.35;

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor={C.azul}
          colors={[C.azul]}
          progressBackgroundColor={C.tarjeta}
        />
      }
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Inventario de Dispositivos
        </Text>
        <Text style={styles.headerSubtitle}>
          Taller de monitoreo y control de equipos
        </Text>
      </View>

      {/* TOTAL */}
      <View style={styles.totalCard}>
        <View>
          <Text style={styles.totalLabel}>
            Total de dispositivos registrados
          </Text>
          <Text style={styles.totalNumero}>
            {data.obtenerTotalDispositivo}
          </Text>
        </View>
        <View style={styles.totalIcon}>
          <Text style={{ fontSize: 32 }}>🖥️</Text>
        </View>
      </View>

      {/* RESUMEN */}
      <View style={styles.resumenRow}>
        <View style={[styles.resumenCard, { borderColor: C.verde }]}>
          <Text style={[styles.resumenNumero, { color: C.verde }]}>
            {data.listarDispositivosActivos.length}
          </Text>
          <Text style={styles.resumenLabel}>Activos</Text>
        </View>

        <View style={[styles.resumenCard, { borderColor: C.azul }]}>
          <Text style={[styles.resumenNumero, { color: C.azul }]}>
            {data.contarDispositivosTipo.length}
          </Text>
          <Text style={styles.resumenLabel}>Tipos</Text>
        </View>

        <View style={[styles.resumenCard, { borderColor: C.naranja }]}>
          <Text style={[styles.resumenNumero, { color: C.naranja }]}>
            {data.dispositivosModeloDHT22.length}
          </Text>
          <Text style={styles.resumenLabel}>DHT22</Text>
        </View>
      </View>

      {/* GRÁFICA POR TIPO */}
      <Tarjeta titulo="Dispositivos por tipo" icono="📊">
        {tipos.length > 0 ? (
          <View style={styles.contenedorGrafica}>
            <BarChart
              data={tipos}
              width={chartWidth}
              height={190}
              maxValue={maxTipos}
              barWidth={38}
              spacing={22}
              hideRules
              noOfSections={4}
              yAxisTextStyle={{
                color: C.suave,
                fontSize: 13,
                fontWeight: "600",
              }}
              xAxisLabelTextStyle={{
                color: C.texto,
                fontSize: 10,
                fontWeight: "600",
              
              }}
              xAxisThickness={0}
              yAxisThickness={0}
              isAnimated
            />
          </View>
        ) : (
          <Text style={styles.vacio}>
            Sin información disponible
          </Text>
        )}
      </Tarjeta>

      {/* GRÁFICA TIPOS REPETIDOS */}
      <Tarjeta titulo="Tipos con más de un dispositivo" icono="📈">
        {tiposRepetidos.length > 0 ? (
          <View style={styles.contenedorGrafica}>
            <BarChart
              data={tiposRepetidos}
              width={chartWidth}
              height={180}
              maxValue={maxTiposRepetidos}
              barWidth={38}
              spacing={22}
              hideRules
              noOfSections={4}
              yAxisTextStyle={{
                color: C.suave,
                fontSize: 13,
                fontWeight: "600",
              }}
              xAxisLabelTextStyle={{
                color: C.texto,
                fontSize: 10,
                fontWeight: "600",
              }}
              xAxisThickness={0}
              yAxisThickness={0}
              isAnimated
            />
          </View>
        ) : (
          <Text style={styles.vacio}>
            No hay tipos con más de un dispositivo
          </Text>
        )}
      </Tarjeta>

      {/* DISPOSITIVOS ACTIVOS */}
      <Tarjeta
        titulo={`Dispositivos activos (${data.listarDispositivosActivos.length})`}
        icono="🟢"
      >
        {data.listarDispositivosActivos.length > 0 ? (
          data.listarDispositivosActivos.slice(0, 20).map((d, index) => (
            <View key={index} style={styles.activoItem}>
              <View style={styles.activoDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.activoNombre}>{d.nombre}</Text>
                <Text style={styles.activoUbicacion}>
                  {d.ubicacion}
                </Text>
              </View>
              <Text style={styles.activoBadge}>EN LÍNEA</Text>
            </View>
          ))
        ) : (
          <Text style={styles.vacio}>
            No hay dispositivos activos
          </Text>
        )}
      </Tarjeta>

      {/* 3 PRIMEROS INSTALADOS */}
      <Tarjeta
        titulo="Los 3 primeros dispositivos instalados"
        icono="🛠️"
      >
        {data.tresPrimerosDispositivos.map((d) => (
          <DispositivoCard
            key={d.id}
            nombre={d.nombre}
            modelo={d.modelo}
            ubicacion={d.ubicacion}
            tipo={d.tipo}
            fecha={d.fecha_instalacion}
            activo={d.activo}
          />
        ))}
      </Tarjeta>

      {/* MODELO DHT22 */}
      <Tarjeta
        titulo={`Dispositivos modelo DHT22 (${data.dispositivosModeloDHT22.length})`}
        icono="🌡️"
      >
        {data.dispositivosModeloDHT22.length > 0 ? (
          data.dispositivosModeloDHT22.slice(0, 20).map((d) => (
            <DispositivoCard
              key={d.id}
              nombre={d.nombre}
              modelo={d.modelo}
              ubicacion={d.ubicacion}
              tipo={d.tipo}
              fecha={d.fecha_instalacion}
              activo={d.activo}
            />
          ))
        ) : (
          <Text style={styles.vacio}>
            No hay dispositivos DHT22 registrados
          </Text>
        )}
      </Tarjeta>

      {/* INSTALADOS EL MISMO DÍA */}
      <Tarjeta
        titulo={`Instalados el mismo día (${data.dispositivosInstaladosElMismoDia.length})`}
        icono="📅"
      >
        {data.dispositivosInstaladosElMismoDia.length > 0 ? (
          data.dispositivosInstaladosElMismoDia.slice(0, 20).map((d) => (
            <DispositivoCard
              key={d.id}
              nombre={d.nombre}
              modelo={d.modelo}
              ubicacion={d.ubicacion}
              tipo={d.tipo}
              fecha={d.fecha_instalacion}
              activo={d.activo}
            />
          ))
        ) : (
          <Text style={styles.vacio}>
            No hay dispositivos instalados el mismo día
          </Text>
        )}
      </Tarjeta>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: C.fondo,
  },
  centro: {
    flex: 1,
    backgroundColor: C.fondo,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    color: C.suave,
    marginTop: 14,
    fontSize: 15,
  },
  errorText: {
    color: C.texto,
    fontSize: 16,
    fontWeight: "600",
  },
  errorSub: {
    color: C.suave,
    marginTop: 8,
    fontSize: 13,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    color: C.texto,
    fontSize: 24,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: C.suave,
    fontSize: 14,
    marginTop: 4,
  },
  totalCard: {
    backgroundColor: C.tarjeta,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: C.borde,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: C.suave,
    fontSize: 14,
  },
  totalNumero: {
    color: C.verde,
    fontSize: 40,
    fontWeight: "800",
    marginTop: 4,
  },
  totalIcon: {
    width: 60,
    height: 60,
    borderRadius: 9,
    backgroundColor: "#FFF7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  resumenRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  resumenCard: {
    flex: 1,
    backgroundColor: C.tarjeta,
    borderRadius: 8,
    borderWidth: 1.5,
    paddingVertical: 14,
    alignItems: "center",
  },
  resumenNumero: {
    fontSize: 22,
    fontWeight: "700",
  },
  resumenLabel: {
    color: C.suave,
    fontSize: 12,
    marginTop: 4,
  },
  tarjeta: {
    backgroundColor: C.tarjeta,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: C.borde,
    padding: 16,
    marginBottom: 16,
  },
  tarjetaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  icono: {
    fontSize: 18,
    marginRight: 8,
  },
  titulo: {
    color: C.texto,
    fontSize: 16,
    fontWeight: "600",
  },
  contenedorGrafica: {
    paddingTop: 12,
    overflow: "visible",
  },
  etiquetaGrafica: {
    marginBottom: 8,
    alignItems: "center",
  },
  barLabel: {
    color: C.texto,
    fontSize: 13,
    fontWeight: "800",
  },
  vacio: {
    color: C.suave,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 14,
  },
  dispositivo: {
    backgroundColor: "#FFF7FA",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: C.borde,
    padding: 14,
    marginBottom: 10,
  },
  dispositivoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  nombre: {
    color: C.azul,
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  detalleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  detalleLabel: {
    color: C.suave,
    fontSize: 13,
  },
  detalleValue: {
    color: C.texto,
    fontSize: 13,
    fontWeight: "500",
  },
  activoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7FA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.borde,
  },
  activoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.verde,
    marginRight: 12,
  },
  activoNombre: {
    color: C.texto,
    fontSize: 14,
    fontWeight: "600",
  },
  activoUbicacion: {
    color: C.suave,
    fontSize: 12,
    marginTop: 2,
  },
  activoBadge: {
    color: C.verde,
    fontSize: 11,
    fontWeight: "700",
  },
});
