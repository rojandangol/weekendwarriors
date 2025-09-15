#working on this.
#This is a python script that will help
#populate the MySQL DB by pulling from the csv we will be 
#making
import pandas as pd
import pymysql

db = pymysql.connect(
    #enter your mysql details here
)
cursor = db.cursor()

#reading xlsx
df= pd.read_excel("tips2.xlsx")

print(df)



#If for row in df; you are only iterating over the column names, not the rows
#from: https://www.w3schools.com/python/pandas/ref_df_values.asp 
# for row in df.values:
#     print(row)
#     sql = "INSERT INTO Tips(title, type, details, ytlink) VALUES (%s, %s, %s, %s)"
#     # val = (rows[0], rows[1], rows[2], rows[3])
#     cursor.execute(sql, tuple(row))
#     db.commit()
#     print("Data sent to MySQL successfully.")
 
for row in df.values:
    print(row)

    title = row[0]
    type_ = row[1]
    details = row[2]
    ytlink = row[3]
    if not ytlink or str(ytlink).strip() == "":
        ytlink = None
        
    # remove "\n" from the lines
    # use strip so that because sometimes there are random spaces left over after replacements
    # removes white space
    clean_details = details.replace('\n', ' ').replace('  ', ' ').strip()

    sql = "INSERT INTO Tips(title, type, details, ytlink) VALUES (%s, %s, %s, %s)"
    values = (title, type_, clean_details, ytlink)

    cursor.execute(sql, values)
    db.commit()
    print("Data sent to MySQL successfully.")




# print(db)


# #need to automate this:
# #from: https://www.w3schools.com/python/python_mysql_insert.asp 


# sql = "INSERT INTO Tips (title, type, details, ytlink) VALUES (%s,%s, %s,%s)"
# val =("Test title", "Test type", "test detail", "Test link")
# cursor.execute(sql,val)
# db.commit()

# print(cursor.rowcount, "Record inserted")

