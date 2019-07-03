<?php
echo "<html>";
include "meta.php";
echo "<body><main class='table-container'>\n";
include "nav.php";
echo "<h1>Calculation results</h1>";
echo '<table><thead><tr><td>Browser</td><td>Date</td><td>Result</td><td>IP</td></tr></thead>';

$f = fopen("calculations.csv", "r");

while (($line = fgetcsv($f))) {
    echo "<tr>";
    foreach ($line as $cell) {
        echo "<td>" . htmlspecialchars($cell) . "</td>";
    }
    echo "</tr>\n";
}
fclose($f);
echo "\n</table><main></body></html>";
