fun main(){
    val saraReview = CoffeeReview("Sara", "Loved it!", 5)
    val tobesReview = CoffeeReview("Tobes", "Was okay", 3)
    val hueyReview = CoffeeReview("Riley", "Sijapenda", 0)

    // val somn: Int = null // results in an error as Int is a non-null type, resolved by adding a ?
    val somn: Int? = 1

    println(somn)


    println("${hueyReview.name}, ${hueyReview.comment}, ${hueyReview.stars}")
    println("${tobesReview.name}, ${tobesReview.comment}, ${tobesReview.stars}")
    println("${saraReview.name}, ${saraReview.comment}, ${saraReview.stars}")

    val saraLee: Int? = 5 //  results in an error> Argument type mismatch: actual type is 'Int?', but 'Int' was expected.
    printReview("Ngoso", saraLee)

}


class CoffeeReview (
    val name: String,
    val comment: String,
    val stars: Int
)

fun printReview(sname: String,sstars: Int) =
    println("$sname gave it $sstars stars!")
