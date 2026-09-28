from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Configuración de la conexión a PostgreSQL
# Se recomienda usar variables de entorno para las credenciales
DB_USER = "user"
DB_PASSWORD = "password"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "payments_db"

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL)

# Crear una clase SessionLocal que será una fábrica de sesiones
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Genera una sesión de base de datos y la cierra al finalizar."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

if __name__ == '__main__':
    # Ejemplo de cómo crear las tablas si no existen (usar con precaución)
    # from app.db.base import Base
    # Base.metadata.create_all(bind=engine)
    print("Conexión a PostgreSQL configurada.")
    # Puedes añadir aquí lógica para probar la conexión si es necesario
    try:
        with engine.connect() as connection:
            connection.execute("SELECT 1")
        print("Prueba de conexión exitosa.")
    except Exception as e:
        print(f"Error al conectar a la base de datos: {e}")
