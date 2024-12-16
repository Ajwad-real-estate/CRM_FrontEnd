from openpyxl import Workbook
from openpyxl.styles import Font, Alignment

wb = Workbook()
ws = wb.active

# Set headers with bold formatting
ws.append(['Name', 'Age', 'City'])
for row in ws[1]:
    row.font = Font(bold=True)

# Align data
ws.column_dimensions['A'].alignment = Alignment(horizontal='left')
ws.column_dimensions['B'].alignment = Alignment(horizontal='right')
ws.column_dimensions['C'].alignment = Alignment(horizontal='center')

# Write data
ws.append(['John Doe', 30, 'New York'])
ws.append(['Jane Smith', 25, 'Los Angeles'])

wb.save('readable_data.xlsx')
