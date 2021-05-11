use crate::primes::get_primes;

mod primes;

fn main() {
    const MAX: u32 = 1_000_000;
    get_primes(MAX);
}
