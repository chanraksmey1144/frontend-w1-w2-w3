using System;

namespace Test{
    internal class Program{
        static void Main(string[] args){
            int choice = 2;
            
            string result = choice switch {
                1 => "Add Product",
                2 => "View Products",
                3 => "Delete Product",
                _ => "Invalid Choice"
            };
            Console.WriteLine(result);
            Console.Write("Press ENTER to exit...");
            Console.ReadLine();
        }
    }
}