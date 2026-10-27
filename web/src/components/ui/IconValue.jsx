const isImage = (value) => typeof value === 'string' && /^(https?:\/\/|\/|data:image\/)/i.test(value.trim())

/** Ícono editable desde el admin: puede ser un emoji (texto) o una imagen subida (URL o data URL). */
export default function IconValue({ value, className = '', imgClass = 'h-6 w-6', alt = '' }) {
  if (!value) return null
  if (isImage(value)) {
    return <img src={value.trim()} alt={alt} className={`inline-block object-contain ${imgClass}`} />
  }
  return <span className={className}>{value}</span>
}
