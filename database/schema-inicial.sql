-- Esquema completo para crear BackToMe desde cero en MySQL 8 o MariaDB 10.4+.
-- Ejecutar una sola vez con una cuenta administradora.
-- Esta base queda vacía: no importa usuarios ni publicaciones de la base anterior.

CREATE DATABASE IF NOT EXISTS backtome
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE backtome;

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    carnet VARCHAR(40) NOT NULL,
    carrera VARCHAR(150) NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol ENUM('usuario', 'administrador') NOT NULL DEFAULT 'usuario',
    correo_verificado TINYINT(1) NOT NULL DEFAULT 0,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_usuarios_correo (correo),
    UNIQUE KEY uq_usuarios_carnet (carnet)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS verificaciones_correo (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL,
    vence_en DATETIME NOT NULL,
    usado_en DATETIME NULL,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_verificaciones_token_hash (token_hash),
    KEY ix_verificaciones_usuario_vence (usuario_id, vence_en),
    CONSTRAINT fk_verificaciones_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sesiones (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL,
    vence_en DATETIME NOT NULL,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_sesiones_token_hash (token_hash),
    KEY ix_sesiones_usuario_vence (usuario_id, vence_en),
    CONSTRAINT fk_sesiones_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS recuperaciones_contrasena (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL,
    vence_en DATETIME NOT NULL,
    usado_en DATETIME NULL,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_recuperaciones_token_hash (token_hash),
    KEY ix_recuperaciones_usuario_vence (usuario_id, vence_en),
    CONSTRAINT fk_recuperaciones_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS objetos (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT UNSIGNED NOT NULL,
    tipo ENUM('perdido', 'encontrado') NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    foto_url MEDIUMTEXT NULL,
    lugar VARCHAR(200) NOT NULL,
    fecha_del_suceso DATE NOT NULL,
    estado ENUM('publicado', 'archivado') NOT NULL DEFAULT 'publicado',
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY ix_objetos_usuario_estado (usuario_id, estado),
    KEY ix_objetos_estado_creado (estado, creado_en),
    CONSTRAINT fk_objetos_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS solicitudes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    objeto_id BIGINT UNSIGNED NOT NULL,
    solicitante_id BIGINT UNSIGNED NOT NULL,
    mensaje TEXT NULL,
    estado ENUM('pendiente', 'aceptada', 'rechazada') NOT NULL DEFAULT 'pendiente',
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY ix_solicitudes_objeto_solicitante_estado (objeto_id, solicitante_id, estado),
    KEY ix_solicitudes_solicitante_creado (solicitante_id, creado_en),
    CONSTRAINT fk_solicitudes_objeto
        FOREIGN KEY (objeto_id) REFERENCES objetos (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_solicitudes_solicitante
        FOREIGN KEY (solicitante_id) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS conversaciones (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    objeto_id BIGINT UNSIGNED NOT NULL,
    solicitud_id BIGINT UNSIGNED NOT NULL,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_conversaciones_solicitud (solicitud_id),
    KEY ix_conversaciones_objeto_creado (objeto_id, creado_en),
    CONSTRAINT fk_conversaciones_objeto
        FOREIGN KEY (objeto_id) REFERENCES objetos (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_conversaciones_solicitud
        FOREIGN KEY (solicitud_id) REFERENCES solicitudes (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS participantes_conversacion (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    conversacion_id BIGINT UNSIGNED NOT NULL,
    usuario_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_participantes_conversacion_usuario (conversacion_id, usuario_id),
    KEY ix_participantes_usuario (usuario_id),
    CONSTRAINT fk_participantes_conversacion
        FOREIGN KEY (conversacion_id) REFERENCES conversaciones (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_participantes_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mensajes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    conversacion_id BIGINT UNSIGNED NOT NULL,
    remitente_id BIGINT UNSIGNED NOT NULL,
    contenido VARCHAR(500) NOT NULL,
    enviado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY ix_mensajes_conversacion_enviado (conversacion_id, enviado_en),
    CONSTRAINT fk_mensajes_conversacion
        FOREIGN KEY (conversacion_id) REFERENCES conversaciones (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_mensajes_remitente
        FOREIGN KEY (remitente_id) REFERENCES usuarios (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Con una cuenta administradora, crea el usuario de aplicación y concede solo
-- los permisos que necesita el servidor. Sustituye la clave antes de ejecutar:
-- CREATE USER IF NOT EXISTS 'backtome'@'localhost' IDENTIFIED BY 'CAMBIA_ESTA_CLAVE';
-- ALTER USER 'backtome'@'localhost' IDENTIFIED BY 'CAMBIA_ESTA_CLAVE';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON backtome.* TO 'backtome'@'localhost';
