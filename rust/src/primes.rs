use std::time::SystemTime;



pub fn get_primes(max: u32) -> Vec<u32> {
    let mut primes: Vec<u32> = Vec::new();
    primes.push(2);
    let start = SystemTime::now();
    for i in 3..max {
        if i % 2 == 0 {
            continue;
        }

        let sqr_root = (i as f32).sqrt() as u32;
        for y in &primes {
           if y >= &sqr_root {
               primes.push(i);
               break;
           } else if i % y == 0 {
               break;
           }
        }
    }
    println!("{} primes found in {} ms", primes.len(), start.elapsed().unwrap().as_millis());
    primes
}