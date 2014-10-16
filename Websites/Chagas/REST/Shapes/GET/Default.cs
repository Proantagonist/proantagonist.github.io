using System;
using System.Collections.Generic;
//using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

public partial class Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        try
        {
            string table = Request["table"];
            SqlConnection connection = new SqlConnection("user id=atharmon;" +
                                           "password=Paincakes14;server=geog489-05.tamu.edu;" +
                                           "database=AaronChagas; " +
                                           "connection timeout=30");

            
            string sql = "SELECT ";
            sql += " c.WKT, ";
            sql += " c.NAME,  ";
            sql += " t.Total  ";
            
            //string sql = "SELECT ";
            //sql += " WKT, FIPS  ";
            sql += " FROM  ";
            sql += " [counties_copy] c";
            sql += " JOIN ";
            //sql += " [SanguisugaTotal] t";
            //sql += " [LecticulariaTotal] t";
            sql += table + " t";
            //sql += " [IndictivaTotal] t";
            sql += " ON c.NAME = t.County ";
            //sql += " WHERE ";
            //sql += "[NAME] = 'Harris' OR [NAME] = 'Waller' ";


            SqlCommand command = new SqlCommand(sql, connection);

            //SqlParameter parameter = new SqlParameter("@propertyID", queryCategory);
            //command.Parameters.Add(parameter);
            

            command.Connection.Open();
            SqlDataReader dataReader = command.ExecuteReader();

            Response.Write("{ ");
            Response.Write(Environment.NewLine);
            Response.Write("\"items\": ");
            Response.Write(Environment.NewLine);
            Response.Write("[ {");
            Response.Write(Environment.NewLine);

            int i = 0;
            int max = 0;

            while (dataReader.Read())
            {

                if (i > 0)
                {
                    Response.Write(", {");
                }
                int total = Int32.Parse(dataReader["Total"].ToString());
                if (total > max)
                {
                    max = total;
                }
                
                Response.Write("\t");
                Response.Write("\"WKT\": ");
                Response.Write("\"" + dataReader["WKT"] + "\", ");
                Response.Write(Environment.NewLine);
                Response.Write("\t");
                Response.Write("\"NAME\": ");
                Response.Write("\"" + dataReader["NAME"] + "\", ");
                Response.Write(Environment.NewLine);
                Response.Write("\t");
                Response.Write("\"Total\": ");
                Response.Write("\"" + dataReader["Total"] + "\" ");
                Response.Write(Environment.NewLine);


                Response.Write("\t");
                Response.Write(" }");
                Response.Write(Environment.NewLine);

                i++;
            }

            Response.Write("],");
            Response.Write("");
            Response.Write("\t");
            Response.Write("\"Max\": ");
            Response.Write("\"" + max + "\" ");
            Response.Write("} ");

        }
        catch (Exception ex)
        {
            Response.Write("Exception ocurred: " + ex.Message);
        }
    }
}