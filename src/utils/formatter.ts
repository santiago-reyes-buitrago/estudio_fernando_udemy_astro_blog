export class Formatter {
    static FormatDate(date: Date): string {
        return Intl.DateTimeFormat('es-ES',{
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(date)
    }
}